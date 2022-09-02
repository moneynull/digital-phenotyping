import datetime
import time

from django.http import Http404
from django.shortcuts import render

# Create your views here.
import json

from rest_framework.response import Response
from rest_framework.views import APIView

from screenServer import models

from locationServer.views import PreProcessLocation

one_day = 86400000
one_min = 60000


def extract_data(request):
    req = json.loads(request.body.decode().replace("'", "\""))
    uid = req.get('uid')
    end_timestamp = req.get('endDate')
    start_timestamp = req.get('startDate')

    device_result = models.TbClient.objects.filter(uid=uid).values("aware_device_id")
    device_id = device_result[0]["aware_device_id"]
    return device_id, start_timestamp, end_timestamp

class ScreenUnlockedTimes(APIView):
    @staticmethod
    def post(request):
        device_id, start_timestamp, end_timestamp = extract_data(request)

        start_zero_date, interval, start_zero_timestamp, end_zero_timestamp \
            = PreProcessLocation.getDatePremeters(start_timestamp, end_timestamp)

        try:
            screen_result = models.Screen.objects \
                .filter(device_id=device_id,
                        timestamp__lt=start_zero_timestamp + one_day * interval,
                        timestamp__gte=start_zero_timestamp) \
                .order_by('timestamp').values('timestamp', 'screen_status')
        except:
            raise Http404   
        
        unlock_date_times_list = []
        # init unlocked info array
        
        date_list = []
        for i in range(interval):
            zero_list = []
            hour_list = []
            for j in range(24):
                zero_list.append(0)
                hour_list.append(j)
            
            # assemble result data structure
            date_list.append(start_zero_timestamp + i * one_day)
            unlock_date_times_list.append([date_list[i], hour_list, zero_list])

        # handle records
        day = 0
        
        for i in range(len(screen_result)):
            
            if screen_result[i]['timestamp'] >= date_list[day] + one_day:
                day = day + int((screen_result[i]['timestamp'] - date_list[day]) /  (one_day))
                
            if screen_result[i]['screen_status'] == 3:
                # calculate the hourly times
                hour = int((screen_result[i]['timestamp'] - date_list[day]) / (one_min * 60))
                
                unlock_date_times_list[day][2][hour] = unlock_date_times_list[day][2][hour] + 1
        print(PreProcessLocation.getDateFromTimestamp(unlock_date_times_list[0][0]))
        
        # get result
        result_list = []
        for i in unlock_date_times_list:
            result_list.append([PreProcessLocation.getDateFromTimestamp(unlock_date_times_list[0][0]).strftime("%Y-%m-%d"), i[1], i[2]])

        return Response(result_list)

class ScreenUnlocked(APIView):
    @staticmethod
    def post(request):
        device_id, start_timestamp, end_timestamp = extract_data(request)
        print(device_id)

        start_zero_date, interval, start_zero_timestamp, end_zero_timestamp \
            = PreProcessLocation.getDatePremeters(start_timestamp, end_timestamp)

        try:
            screen_result = models.Screen.objects \
                .filter(device_id=device_id,
                        timestamp__lt=start_zero_timestamp + one_day * interval,
                        timestamp__gte=start_zero_timestamp) \
                .order_by('timestamp').values('timestamp', 'screen_status')
        except:
            raise Http404

        unlocked_date = []
        unlocked_duration = []
        unlocked_times = []
        unlocked_date_DATE_format = []

        # init unlocked info array
        for i in range(interval):
            unlocked_times.append(0)
            unlocked_duration.append(0)
            unlocked_date.append(start_zero_timestamp + i * one_day)
            unlocked_date_DATE_format.append( \
                PreProcessLocation.getDateFromTimestamp(start_zero_timestamp + i * one_day) \
                    .strftime("%Y-%m-%d"))

        # handle first record
        unlocked_result = models.Screen.objects.filter(device_id=device_id, timestamp__lt=start_zero_timestamp) \
                              .order_by('-timestamp').values('timestamp', 'screen_status')[:1]
        if len(unlocked_result) != 0 and unlocked_result[0]['screen_status'] == 3:
            if screen_result[0]['timestamp'] - unlocked_result[0]['timestamp'] <= 6 * 60 * one_min:
                unlocked_duration[0] += screen_result[0]['timestamp'] - unlocked_date[0]

        unlocked_index = 0
        result_len = len(screen_result)
        for i in range(result_len - 1):
            # next day
            if screen_result[i]['timestamp'] >= unlocked_date[unlocked_index] + one_day:
                unlocked_index += 1

            if screen_result[i]['screen_status'] == 3:
                # ignore the record more than 6 hours
                if screen_result[i + 1]['timestamp'] - screen_result[i]['timestamp'] <= 6 * 60 * one_min:
                    unlocked_times[unlocked_index] += 1
                    # normal case
                    if screen_result[i + 1]['timestamp'] <= unlocked_date[unlocked_index] + one_day:
                        unlocked_duration[unlocked_index] += \
                            screen_result[i + 1]['timestamp'] - screen_result[i]['timestamp']
                    # cross day
                    else:
                        unlocked_duration[unlocked_index] += \
                            unlocked_date[unlocked_index] + one_day - screen_result[i]['timestamp']
                        # go to next day
                        unlocked_index += 1
                        unlocked_duration[unlocked_index] += screen_result[i + 1]['timestamp'] - unlocked_date[
                            unlocked_index]

        # handle last record
        if result_len != 0 and screen_result[result_len - 1]['screen_status'] == 3:
            off_result = models.Screen.objects.filter(device_id=device_id,
                                                      timestamp__gte=start_zero_timestamp + one_day * interval) \
                             .order_by('timestamp').values('timestamp', 'screen_status')[:1]
            if len(off_result) != 0:  # and off_result[0]['screen_status'] == 0:
                if off_result[0]['timestamp'] - screen_result[result_len - 1]['timestamp'] <= 6 * 60 * one_min:
                    unlocked_duration[-1] += unlocked_date[-1] + one_day - screen_result[-1]['timestamp']

        duration_min = []
        for d in unlocked_duration:
            duration_min.append(round(d / one_min, 1))

        result = [unlocked_date_DATE_format, unlocked_times, duration_min]
        return Response(result)
