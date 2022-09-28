import json
import datetime

from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Count
from django.http import HttpResponse, HttpResponseBadRequest

# Create your views here.
from callServer import models
from locationServer.views import PreProcessLocation
from rest_framework.response import Response
from rest_framework.views import APIView

one_day = 86400000


class CallsInfo(APIView):
    @staticmethod
    def post(request):
        req = json.loads(request.body.decode().replace("'", "\""))
        uid = req.get('uid')
        start_date_stamp = req.get('startDate')
        end_date_stamp = req.get('endDate')

        device_result = models.TbClient.objects.filter(uid=uid).values("aware_device_id")
        device_id = device_result[0]["aware_device_id"]

        start_zero_date, date_interval, start_zero_timestamp, end_zero_timestamp \
            = PreProcessLocation.getDatePremeters(start_date_stamp, end_date_stamp)

        calls_result = models.Calls.objects \
            .filter(device_id=device_id, timestamp__lt=end_zero_timestamp, timestamp__gte=start_zero_timestamp) \
            .values("timestamp", "call_type", "call_duration", "field_id").order_by("timestamp")

        data = calls_process(calls_result, start_zero_timestamp, date_interval)

        res = {
            'success': True,
            'data': data
        }
        return Response(res)


def calls_process(calls_result, start_date_stmp, date_interval):
    res_array = [[] for i in range(3)]
    for i in range(date_interval):
        res_array[0].append(0)
    for i in range(date_interval):
        res_array[1].append(0)
    for i in range(date_interval):
        res_array[2].append(0)

    i = 0  # represent the data type as index
    j = 0  # represent the days index
    res_day = []
    for j in range(date_interval):
        for r in calls_result:
            if start_date_stmp + j * one_day <= r["timestamp"] < start_date_stmp + (j + 1) * one_day:
                res_array[r["call_type"] - 1][j] += 1
            else:
                continue
        res_day.append(datetime.datetime.fromtimestamp( \
            int(start_date_stmp + j * one_day) / 1000).strftime("%Y-%m-%d"))

    res_array.append(res_day)
    return res_array


class CallsTrace(APIView):
    @staticmethod
    def post(request):
        req = json.loads(request.body.decode().replace("'", "\""))
        uid = req.get('uid')
        start_date = req.get('startDate')
        end_date = req.get('endDate')

        device_id = models.TbClient.objects.filter(uid=uid).values("aware_device_id")

        trace_result = models.Calls.objects.all() \
            .filter(device_id__in=device_id, timestamp__gte=start_date, timestamp__lte=end_date) \
            .values_list("trace").annotate(tcount=Count(1)).order_by("-tcount")

        trace_dict = {
            "trace": dict(list(trace_result)).keys(),
            "count": dict(list(trace_result)).values()
        }

        return Response(trace_dict)
