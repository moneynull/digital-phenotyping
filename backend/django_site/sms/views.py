from django.db.models import Count
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from sms import models
import datetime
import time
import json


class QuerySMS(APIView):

    @staticmethod
    def post(request):
        if request.method == 'POST':
            uid = json.loads(request.body.decode().replace("'", "\"")).get('uid')
            start_date_timestamp = json.loads(request.body.decode().replace("'", "\"")).get('startDate')
            end_date_timestamp = json.loads(request.body.decode().replace("'", "\"")).get('endDate')

        if uid == None or start_date_timestamp == None or end_date_timestamp == None or end_date_timestamp < start_date_timestamp:
            return Response(uid)

        device_result = models.TbClient.objects.filter(uid=uid).values("aware_device_id")

        if len(device_result) == 0:
            return Response(device_result)
        device_id = device_result[0]["aware_device_id"]

        # date and timestamp
        start_date = datetime.datetime.fromtimestamp(int(start_date_timestamp) / 1000)
        end_date = datetime.datetime.fromtimestamp(int(end_date_timestamp) / 1000)

        zero_start_date = start_date - datetime.timedelta(hours=start_date.hour, minutes=start_date.minute,
                                                          seconds=start_date.second,
                                                          microseconds=start_date.microsecond)
        zero_end_date = end_date - \
                        datetime.timedelta(hours=end_date.hour, minutes=end_date.minute, seconds=end_date.second,
                                           microseconds=end_date.microsecond) \
                        + datetime.timedelta(days=1)

        date_interval = zero_end_date - zero_start_date

        zero_start_date_timestamp = int(time.mktime(zero_start_date.timetuple()) * 1000)
        zero_end_date_timestamp = int(time.mktime(zero_end_date.timetuple()) * 1000)

        # get sms data
        sms_results = models.Messages.objects.filter(device_id=device_id) \
            .exclude(timestamp__gte=zero_end_date_timestamp) \
            .filter(timestamp__gte=zero_start_date_timestamp) \
            .values("field_id", "timestamp", "device_id", "message_type", "trace") \
            .order_by("timestamp")

        if len(sms_results) == 0:
            return Response(sms_results)

        # store data into list, optimize performance
        timestamp_list = []
        message_type_list = []
        for l in sms_results:
            timestamp_list.append(l['timestamp'])
            message_type_list.append(l['message_type'])

        # initial list
        result_array = [[] for i in range(3)]
        date_array = []
        for i in range(date_interval.days):
            result_array[0].append(0)
        for i in range(date_interval.days):
            result_array[1].append(0)
        for i in range(date_interval.days):
            result_array[2].append((start_date + datetime.timedelta(days=i)).date().strftime('%Y-%m-%d'))
            date_array.append(start_date + datetime.timedelta(days=i))

        i = 0
        j = 0

        start_date_end_timestamp = int(time.mktime((start_date + datetime.timedelta(days=1)).timetuple()) * 1000)

        # operate and calculate sms per day
        for n in range(len(sms_results)):
            # jump days without sms
            while start_date_timestamp > timestamp_list[n] or timestamp_list[n] >= start_date_end_timestamp:

                j += 1
                if j >= date_interval.days:
                    break
                start_date_timestamp = int(time.mktime(date_array[j].timetuple()) * 1000)
                start_date_end_timestamp = int(
                    time.mktime((date_array[j] + datetime.timedelta(days=1)).timetuple()) * 1000)

            if j >= date_interval.days:
                break
            result_array[message_type_list[n] - 1][j] = result_array[message_type_list[n] - 1][j] + 1

        return Response(result_array)


class smsTrace(APIView):
    permission_classes = [AllowAny]
    @staticmethod
    def post(request):
        req = json.loads(request.body.decode().replace("'", "\""))
        uid = req.get('uid')
        start_date = req.get('startDate')
        end_date = req.get('endDate')

        device_id = models.TbClient.objects.filter(uid=uid).values("aware_device_id")

        trace_result = models.Messages.objects.all()\
            .filter(device_id__in=device_id, timestamp__gte=start_date, timestamp__lte=end_date)\
            .values_list("trace").annotate(tcount=Count(1)).order_by("-tcount")

        trace_dict = {
            "trace": dict(list(trace_result)).keys(),
            "count": dict(list(trace_result)).values()
        }

        return Response(trace_dict)
