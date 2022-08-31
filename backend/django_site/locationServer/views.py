import json
import os

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from locationServer.getAddress import getAddressAndType
from locationServer.location_cluster import cluster
from locationServer import models
import datetime
import time

one_day = 86400000


class PreProcessLocation(APIView):

    @staticmethod
    def get(request):
        PreProcessLocation.initialProcessLocation()
        return Response()

    def getUserLatlng(device_id, startDate, endDate):
        location_results = models.Locations.objects.filter(device_id=device_id) \
            .exclude(timestamp__gte=endDate).filter(timestamp__gte=startDate) \
            .exclude(double_latitude=0).exclude(double_longitude=0) \
            .values("double_latitude", "double_longitude")

        latitude_list = []
        longitude_list = []
        for l in location_results:
            latitude_list.append(l['double_latitude'])
            longitude_list.append(l['double_longitude'])
        result_dic = {"double_latitude": latitude_list, "double_longitude": longitude_list}

        return result_dic

    def initialProcessLocation():

        all_devices = models.TbClient.objects \
            .values("aware_device_id") \
            .distinct()

        device_id_list = []
        for i in all_devices:
            device_id_list.append(i["aware_device_id"])

        for i in device_id_list:
            start_timestamp, end_timestamp = PreProcessLocation.getStartAndEndTimestamp(i)
            start_zero_date, interval, start_zero_timestamp, end_zero_timestamp \
                = PreProcessLocation.getDatePremeters(start_timestamp, end_timestamp)
            print(start_timestamp, " -- ", end_timestamp, " ++++++++++++++++ ")

            # check duplicate timestamp
            check_time_list = PreProcessLocation.getCheckTime(i)

            for j in range(interval):
                target_day_start_date = PreProcessLocation.getFutureDate(start_zero_date, j)
                target_day_start_timestamp = PreProcessLocation.getTimestampFromDate(target_day_start_date)
                target_day_end_date = PreProcessLocation.getFutureDate(start_zero_date, j + 1)
                target_day_end_timestamp = PreProcessLocation.getTimestampFromDate(target_day_end_date)

                # If timestamp exist, pass
                if target_day_start_timestamp in check_time_list:
                    continue

                # i is device_id
                try:
                    centroids = cluster(
                        PreProcessLocation.getUserLatlng(i, target_day_start_timestamp, target_day_end_timestamp))
                    locations = getAddressAndType(centroids)

                except:
                    raise Http404

                try:
                    for loc in locations:
                        models.TbLocCluster.objects.create(
                            timestamp=target_day_start_timestamp,
                            device_id=i,
                            double_latitude=loc[0],
                            double_longitude=loc[1],
                            address=loc[2],
                            loc_type=loc[3]
                        )
                except:
                    raise Http404

    def getDatePremeters(start_timestamp, end_timestamp):
        start_zero_date = PreProcessLocation.getZeroDate( \
            PreProcessLocation.getDateFromTimestamp(start_timestamp))
        end_zero_date = PreProcessLocation.getZeroDate( \
            PreProcessLocation.getNextDate( \
                PreProcessLocation.getDateFromTimestamp(end_timestamp)))
        interval = end_zero_date - start_zero_date
        start_zero_timestamp = PreProcessLocation.getTimestampFromDate(start_zero_date)
        end_zero_timestamp = PreProcessLocation.getTimestampFromDate(end_zero_date)

        return start_zero_date, interval.days, start_zero_timestamp, end_zero_timestamp

    def getStartAndEndTimestamp(device_id):
        timestamp_list = models.Locations.objects.filter(device_id=device_id) \
            .values("timestamp") \
            .order_by("timestamp")

        start_timestamp = timestamp_list[0]["timestamp"]
        end_timestamp = timestamp_list[len(timestamp_list) - 1]["timestamp"]
        return start_timestamp, end_timestamp

    def getCheckTime(device_id):
        start_timestamp_list = []
        timestamp_list = models.TbLocCluster.objects.filter(device_id=device_id) \
            .values("timestamp").distinct().order_by("timestamp")

        for t in timestamp_list:
            start_timestamp_list.append(int(t["timestamp"]))

        return start_timestamp_list

    def getZeroDate(date):
        zero_date = date \
                    - datetime.timedelta( \
            hours=date.hour, \
            minutes=date.minute, \
            seconds=date.second, \
            microseconds=date.microsecond)

        return zero_date

    def getDateFromTimestamp(timestamp):
        target_date = datetime.datetime.fromtimestamp(int(timestamp) / 1000)
        return target_date

    def getTimestampFromDate(date):
        target_timestamp = int(time.mktime(date.timetuple()) * 1000)
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
        end_timestamp = req.get('endDate')
        start_timestamp = req.get('startDate')

        device_result = models.TbClient.objects.filter(uid=uid).values("aware_device_id")
        if len(device_result) == 0:
            return Response("uid does not exist")
        device_id = device_result[0]["aware_device_id"]

        # a day's timestamp, address_list, visited_times_list, type_list
        start_zero_date, interval, start_zero_timestamp, end_zero_timestamp \
            = PreProcessLocation.getDatePremeters(start_timestamp, end_timestamp)

        data_2d_arr = []

        type_dic = {}
        try:
            type_results = models.TbLocCluster.objects.filter(device_id=device_id) \
                .exclude(timestamp__gte=end_zero_timestamp).filter(timestamp__gte=start_zero_timestamp) \
                .values('loc_type') \
                .distinct()
        except:
            raise Http404

        for result in type_results:
            if result['loc_type'] not in type_dic:
                type_dic[result['loc_type']] = 0

        for j in range(interval):
            target_day_start_date = PreProcessLocation.getFutureDate(start_zero_date, j)
            target_day_start_timestamp = PreProcessLocation.getTimestampFromDate(target_day_start_date)
            target_day_end_date = PreProcessLocation.getFutureDate(start_zero_date, j + 1)
            target_day_end_timestamp = PreProcessLocation.getTimestampFromDate(target_day_end_date)

            # address_name_dic = {}

            try:
                clustered_loc_results = models.TbLocCluster.objects.filter(device_id=device_id) \
                    .exclude(timestamp__gte=target_day_end_timestamp).filter(timestamp__gte=target_day_start_timestamp) \
                    .values('address', 'loc_type')
            except:
                raise Http404

            for item in type_dic:
                type_dic[item] = 0

            num_visited_today = len(clustered_loc_results)

            for result in clustered_loc_results:
                # if result['address'] not in address_name_dic:
                #     address_name_dic[result['address']] = 1
                # else:
                #     address_name_dic[result['address']] += 1

                if result['loc_type'] not in type_dic:
                    type_dic[result['loc_type']] = 1
                else:
                    type_dic[result['loc_type']] += 1

            # addr_arr = []
            # count_arr = []
            # for address, count in address_name_dic.items():
            #     addr_arr.append(address)
            #     count_arr.append(count)

            type_arr = []
            type_count_arr = []
            for type_name, count in type_dic.items():
                type_arr.append(type_name)
                type_count_arr.append(count)

            data_2d_arr.append([target_day_start_date.strftime("%Y-%m-%d"), \
                                num_visited_today, type_arr, type_count_arr])

        return Response(data_2d_arr)


class MapCoordinate(APIView):
    @staticmethod
    def post(request):
        req = json.loads(request.body.decode().replace("'", "\""))
        uid = req.get('uid')
        end_timestamp = req.get('endDate')
        start_timestamp = req.get('startDate')

        device_result = models.TbClient.objects.filter(uid=uid).values("aware_device_id")
        if len(device_result) == 0:
            return Response("uid does not exist")
        device_id = device_result[0]["aware_device_id"]

        # a day's timestamp, address_list, visited_times_list, type_list
        start_zero_date, interval, start_zero_timestamp, end_zero_timestamp \
            = PreProcessLocation.getDatePremeters(start_timestamp, end_timestamp)

        try:
            loc_results = models.TbLocCluster.objects.filter(device_id=device_id) \
                .exclude(timestamp__gte=end_zero_timestamp).filter(timestamp__gte=start_zero_timestamp) \
                .values('field_id', 'double_latitude', 'double_longitude', 'address', 'loc_type')
        except:
            raise Http404

        data = []
        for r in loc_results:
            data.append({
                "id": r['field_id'],
                "address": r['address'],
                "locType": r['loc_type'],
                "position": {
                    "lat": r['double_latitude'],
                    "lng": r['double_longitude']
                }
            })
        result_dic = {"key": os.environ.get('GOOGLE_API_KEY', '1'), "data": data}
        return Response(result_dic)
