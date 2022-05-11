import json
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from preProcessLocation.getAddress import getAddressAndType
from preProcessLocation.location_cluster import cluster
from preProcessLocation import models
import datetime
import time


class PreProcessLocation(APIView):
    
    @staticmethod
    def get(request):
        PreProcessLocation.initialProcessLocation()
        return Response()

    def getUserLatlng(device_id, startDate, endDate):
        location_results = models.Locations.objects.filter(device_id=device_id)\
            .exclude(timestamp__gte = endDate).filter(timestamp__gte = startDate)\
                .exclude(double_latitude=0).exclude(double_longitude=0)\
                    .values("double_latitude", "double_longitude")

        latitude_list = []
        longitude_list = []
        for l in location_results:
            latitude_list.append(l['double_latitude'])
            longitude_list.append(l['double_longitude'])
        result_dic={"double_latitude":latitude_list,"double_longitude":longitude_list}

        return result_dic

    def initialProcessLocation():

        all_devices = models.TbClient.objects\
            .values("awaredeviceid")\
                .distinct()

        device_id_list = []
        for i in all_devices:
            device_id_list.append(i["awaredeviceid"])

        for i in device_id_list:
            start_timestamp, end_timestamp = PreProcessLocation.getStartAndEndTimestamp(i)
            start_zero_date, end_zero_date, interval, start_zero_timestamp, end_zero_timestamp\
                = PreProcessLocation.getDatePremeters(start_timestamp, end_timestamp)
            print(start_timestamp, " -- ", end_timestamp, " ++++++++++++++++ " )
            for j in range(interval):
                target_day_start_date = PreProcessLocation.getFutureDate(start_zero_date, j)
                target_day_start_timestamp = PreProcessLocation.getTimeStampFromDate(target_day_start_date)
                target_day_end_date = PreProcessLocation.getFutureDate(start_zero_date, j + 1)
                target_day_end_timestamp = PreProcessLocation.getTimeStampFromDate(target_day_end_date)
                print(target_day_start_date, ' - ', target_day_end_date)

                # i is device_id
                try:
                    centroids = cluster(PreProcessLocation.getUserLatlng(i, target_day_start_timestamp, target_day_end_timestamp))
                    locations = getAddressAndType(centroids)

                except:
                    raise Http404
                
                try:
                    for loc in locations:
                        models.TbLocCluster.objects.create(
                            timestamp = target_day_start_timestamp,
                            device_id = i,
                            double_latitude = loc[0],
                            double_longitude = loc[1],
                            address = loc[2],
                            loc_type = loc[3]
                        )
                except:
                    raise Http404

    def getDatePremeters(start_timestamp,end_timestamp):
        start_zero_date = PreProcessLocation.getZeroDate(\
            PreProcessLocation.getDateFromTimestamp(start_timestamp))
        end_zero_date = PreProcessLocation.getZeroDate(\
            PreProcessLocation.getNextDate(\
                PreProcessLocation.getDateFromTimestamp(end_timestamp)))
        interval = end_zero_date - start_zero_date
        start_zero_timestamp = PreProcessLocation.getTimeStampFromDate(start_zero_date)
        end_zero_timestamp = PreProcessLocation.getTimeStampFromDate(end_zero_date)

        return start_zero_date, end_zero_date, interval.days, start_zero_timestamp, end_zero_timestamp

    def getStartAndEndTimestamp(device_id):
        timestamp_list = models.Locations.objects.filter(device_id=device_id)\
            .values("timestamp")\
                .order_by("timestamp")
                
        start_timestamp = timestamp_list[0]["timestamp"]
        end_timestamp = timestamp_list[len(timestamp_list)-1]["timestamp"]
        return start_timestamp, end_timestamp

    def getZeroDate(date):
        zero_date = date\
            - datetime.timedelta(\
                hours=date.hour, \
                    minutes=date.minute, \
                        seconds=date.second, \
                            microseconds=date.microsecond)
        
        return zero_date

    def getDateFromTimestamp(timestamp):
        target_date = datetime.datetime.fromtimestamp(int(timestamp)/1000)
        return target_date
    
    def getTimeStampFromDate(date):
        target_timestamp = int(time.mktime(date.timetuple() )* 1000)
        return target_timestamp

    def getNextDate(date):
        target_date = date + datetime.timedelta(days=1)
        return target_date

    def getFutureDate(date, value):
        target_date = date + datetime.timedelta(days=value)
        return target_date

class NumbersLocation(APIView):
    @staticmethod
    def post(request):
        req = json.loads(request.body.decode().replace("'", "\""))
        uid = req.get('uid')
        start_timestamp = req.get('startDate')
        end_timestamp = req.get('endDate')

        device_result = models.TbClient.objects.filter(uid=uid).values("awaredeviceid")
        device_id = device_result[0]["awaredeviceid"]

        # a day's timestamp, address_list, visited_times_list, type_list
        start_zero_date, end_zero_date, interval, start_zero_timestamp, end_zero_timestamp \
            = PreProcessLocation.getDatePremeters(start_timestamp, end_timestamp)

        data_2d_arr = []
        for j in range(interval):
            target_day_start_date = PreProcessLocation.getFutureDate(start_zero_date, j)
            target_day_start_timestamp = PreProcessLocation.getTimeStampFromDate(target_day_start_date)
            target_day_end_date = PreProcessLocation.getFutureDate(start_zero_date, j + 1)
            target_day_end_timestamp = PreProcessLocation.getTimeStampFromDate(target_day_end_date)

            address_name_dic = {}
            try:
                clustered_loc_results = models.TbLocCluster.objects.filter(device_id=device_id) \
                    .exclude(timestamp__gte=target_day_end_timestamp).filter(timestamp__gte=target_day_start_timestamp) \
                    .values('address')
            except:
                raise Http404

            for result in clustered_loc_results:
                if result['address'] not in address_name_dic:
                    address_name_dic[result['address']] = 0
                address_name_dic[result['address']] += 1

            addr_arr = []
            count_arr = []
            for address, count in address_name_dic.items():
                addr_arr.append(address)
                count_arr.append(count)

            data_2d_arr.append([target_day_start_timestamp, addr_arr, count_arr])

        return Response(data_2d_arr)