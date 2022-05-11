from rest_framework.views import APIView
from rest_framework.response import Response
from sms import models
import datetime
import time
import json
import googlemaps  
import pandas as pd


class QuerySMS(APIView):
    @staticmethod
    def get(request):

        # point = (-37.77964745, 144.96107302 ) -37.7903962,144.9530216 -37.7941334,144.9653626
        # lat_list = [-37.77964745, -37.7743305, -37.7743265 , -37.8002523, -37.79599386267364]
        # lon_list = [144.96107302, 144.9598333, 144.9598262 , 144.9645091, 144.96454194188118]
        # address_list, type_list = getAddress.GetAddress.getAddressAndType(lat_list, lon_list)
        # print(address_list)
        # print(type_list)
        # 
        # point = (-37.77433551264112, 144.95981690785675 )
        # place = gmaps.places_nearby(point,25)
        # print(place)
        # place1 = gmaps.find_place("7 Union St, Brunswick", input_type = "textquery")
        # print(place1)
        # place_id = place1['candidates'][0]['place_id']
        # place2 = gmaps.geocode(place_id)
        # print(place_id)
        # print(place2)
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
        
        return Response(result_array)
