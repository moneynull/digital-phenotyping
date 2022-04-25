from rest_framework.views import APIView
from rest_framework.response import Response
from sms.models import Messages
from sms.models import TbClient
import datetime
import time
from django.http import HttpResponse
from django.shortcuts import render
import json


class QuerySMS(APIView):
    @staticmethod
    def get(request):

        return Response()

    
    @staticmethod
    def post(request):
        if request.method == 'POST':
            uid = json.loads(request.body.decode().replace("'", "\"")).get('uid')
            start_date_timestamp = json.loads(request.body.decode().replace("'", "\"")).get('startDate')
            end_date_timestamp = json.loads(request.body.decode().replace("'", "\"")).get('endDate')
        
        #uid = req["uid"]
        print(uid)
        device_result = TbClient.objects.filter(uid=uid).values("awaredeviceid")
        device_id = device_result[0]["awaredeviceid"]

        # today_timestamp = "1642056676314"
        # today = datetime.datetime.fromtimestamp(int(today_timestamp)/1000)

        # today = datetime.datetime.now()

        # zero_today = today - datetime.timedelta(hours=today.hour, minutes=today.minute, seconds=today.second,microseconds=today.microsecond)
        
        # start_date = zero_today - datetime.timedelta(days=5)
        # end_date = zero_today

        start_date = datetime.datetime.fromtimestamp(int(start_date_timestamp)/1000)
        end_date = datetime.datetime.fromtimestamp(int(end_date_timestamp)/1000)

        date_interval = end_date - start_date

        print(start_date,end_date,date_interval)

        # start_date_timestamp = int(time.mktime(start_date.timetuple() )* 1000)
        # end_date_timestamp = int(time.mktime(end_date.timetuple() )* 1000)

        # print(start_date_timestamp)
        # print(end_date_timestamp)

        sms_results = Messages.objects.filter(device_id=device_id)\
            .exclude(timestamp__gte = end_date_timestamp)\
                .filter(timestamp__gte = start_date_timestamp)\
                    .values("field_id","timestamp","device_id","message_type","trace")\
                        .order_by("timestamp")

        # initial list
        result_array = [[] for i in range(3)]
        date_array = []
        for i in range(date_interval.days):
            result_array[0].append(0)
        for i in range(date_interval.days):
            result_array[1].append(0)
        for i in range(date_interval.days):
            result_array[2].append((start_date + datetime.timedelta(days=i)).date().strftime('%d/%m/%Y'))
            date_array.append(start_date + datetime.timedelta(days=i))

        i = 0
        j = 0

        start_date_end_timestamp = int(time.mktime((start_date + datetime.timedelta(days=1)).timetuple() )* 1000)

        for r in sms_results:
            
            while start_date_timestamp > r["timestamp"] or r["timestamp"] >= start_date_end_timestamp:
                
                j += 1
                start_date_timestamp = int(time.mktime(date_array[j].timetuple()) * 1000)
                start_date_end_timestamp = int(time.mktime((date_array[j] + datetime.timedelta(days=1)).timetuple()) * 1000)
                
                if j > date_interval.days:
                    break
                
            if j >= date_interval.days:
                    break
            result_array[r["message_type"] - 1][j] = result_array[r["message_type"] - 1][j] + 1

        print(result_array)

        return Response(result_array)
