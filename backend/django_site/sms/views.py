from rest_framework.views import APIView
from rest_framework.response import Response
from sms import models
import datetime
import time
from django.http import HttpResponse
from django.shortcuts import render
import json
from geopy.geocoders import GoogleV3


class QuerySMS(APIView):
    @staticmethod
    def get(request):
        # geolocator = GoogleV3(api_key='AIzaSyCF-I4LgabjEwFFjMqHSuMNdX1_MTa6P6A')
        # point = (-37.78015147, 144.96134667 )
        # point1 = (-37.801088970154524, 144.96465174481273)
        # point2 = (-37.76197880040854, 144.96164850890636 )
        # #point3 = (31.9735115, 118.7764705 )
        # address = geolocator.reverse(point,sensor=False)
        # address1 = geolocator.reverse(point1,sensor=False)
        # address2 = geolocator.reverse(point2,sensor=False)
        # #address3 = geolocator.reverse(point3,sensor=False)
        # # g = geocoder.google([51.523910, -0.158578], method='reverse')
        # print(address , " ---- ", address1, " ---- " ,address2)
        time1 = time.time()
        # # if request.method == 'POST':
        uid = json.loads(request.body.decode().replace("'", "\"")).get('uid')
            #start_date_timestamp = json.loads(request.body.decode().replace("'", "\"")).get('startDate')
            #end_date_timestamp = json.loads(request.body.decode().replace("'", "\"")).get('endDate')

        device_result = models.TbClient.objects.filter(uid=uid).values("awaredeviceid")
        device_id = device_result[0]["awaredeviceid"]
        time2 = time.time()
        location_results_all = models.Locations.objects.filter(device_id=device_id)\
            .values("double_latitude","double_longitude")\
                .order_by("timestamp")
        location_results = location_results_all[50:]
        
        print(len(location_results_all))
        time3 = time.time()
        
        latitude_list=[]
        longitude_list=[]
        for l in location_results:
            latitude_list.append(l['double_latitude'])
            longitude_list.append(l['double_longitude'])
        time4 = time.time()
        result_array = [[] for i in range(len(latitude_list))]
        for i in range(len(latitude_list)):
            result_array[i].append(latitude_list[i])
            result_array[i].append(longitude_list[i])
        time5 = time.time()
        print(time2 - time1, " -- ", time3 - time2, " -- ", time4 - time3, " -- ", time5 - time4)
        print(result_array)

        return Response()

    
    @staticmethod
    def post(request):
        if request.method == 'POST':
            uid = json.loads(request.body.decode().replace("'", "\"")).get('uid')
            start_date_timestamp = json.loads(request.body.decode().replace("'", "\"")).get('startDate')
            end_date_timestamp = json.loads(request.body.decode().replace("'", "\"")).get('endDate')
        
        device_result = models.TbClient.objects.filter(uid=uid).values("awaredeviceid")
        print(device_result)
        print(len(device_result))
        if len(device_result) == 0:
            return Response(device_result)
        device_id = device_result[0]["awaredeviceid"]

        location_result = models.Messages.objects.filter(device_id=device_id)\
            .exclude(timestamp__gte = zero_end_date_timestamp)\
                .filter(timestamp__gte = zero_start_date_timestamp)\
                    .values("field_id","timestamp","device_id","message_type","trace")\
                        .order_by("timestamp")

        # today_timestamp = "1642056676314"
        # today = datetime.datetime.fromtimestamp(int(today_timestamp)/1000)

        # today = datetime.datetime.now()

        # zero_today = today - datetime.timedelta(hours=today.hour, minutes=today.minute, seconds=today.second,microseconds=today.microsecond)
        
        # start_date = zero_today - datetime.timedelta(days=5)
        # end_date = zero_today

        # date and timestamp
        start_date = datetime.datetime.fromtimestamp(int(start_date_timestamp)/1000)
        end_date = datetime.datetime.fromtimestamp(int(end_date_timestamp)/1000)

        zero_start_date = start_date - datetime.timedelta(hours=start_date.hour, minutes=start_date.minute, seconds=start_date.second,microseconds=start_date.microsecond)
        zero_end_date = end_date - \
            datetime.timedelta(hours=end_date.hour, minutes=end_date.minute, seconds=end_date.second,microseconds=end_date.microsecond)\
                + datetime.timedelta(days=1)

        date_interval = zero_end_date - zero_start_date

        zero_start_date_timestamp = int(time.mktime(zero_start_date.timetuple() )* 1000)
        zero_end_date_timestamp = int(time.mktime(zero_end_date.timetuple() )* 1000)

        # get sms data
        sms_results = models.Messages.objects.filter(device_id=device_id)\
            .exclude(timestamp__gte = zero_end_date_timestamp)\
                .filter(timestamp__gte = zero_start_date_timestamp)\
                    .values("field_id","timestamp","device_id","message_type","trace")\
                        .order_by("timestamp")

        # store data into list, optimize performance
        timestamp_list=[]
        message_type_list=[]
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
            result_array[2].append((start_date + datetime.timedelta(days=i)).date().strftime('%d/%m/%Y'))
            date_array.append(start_date + datetime.timedelta(days=i))

        i = 0
        j = 0

        start_date_end_timestamp = int(time.mktime((start_date + datetime.timedelta(days=1)).timetuple() )* 1000)

        # operate and calculate sms per day
        for n in range(len(sms_results)):
            # jump days without sms
            while start_date_timestamp > timestamp_list[n] or timestamp_list[n] >= start_date_end_timestamp:
                
                j += 1
                if j >= date_interval.days:
                    break
                start_date_timestamp = int(time.mktime(date_array[j].timetuple()) * 1000)
                start_date_end_timestamp = int(time.mktime((date_array[j] + datetime.timedelta(days=1)).timetuple()) * 1000)
                
            if j >= date_interval.days:
                    break
            result_array[message_type_list[n] - 1][j] = result_array[message_type_list[n] - 1][j] + 1

        # print(len(sms_results))
        # total = 0
        # for i in range(len(result_array[0])):
        #     total += result_array[0][i] + result_array[1][i]

        # print(total)
        
        return Response(result_array)
