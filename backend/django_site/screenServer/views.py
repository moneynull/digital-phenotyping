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
    start_timestamp = end_timestamp - one_day * 6

    device_result = models.TbClient.objects.filter(uid=uid).values("awaredeviceid")
    device_id = device_result[0]["awaredeviceid"]
    return device_id, start_timestamp, end_timestamp


class ScreenUnlocked(APIView):
    @staticmethod
    def post(request):
        device_id, start_timestamp, end_timestamp = extract_data(request)
        print(device_id)

        start_zero_date, end_zero_date, interval, start_zero_timestamp, end_zero_timestamp \
            = PreProcessLocation.getDatePremeters(start_timestamp, end_timestamp)

        screenList = []
        unlocked_date = []
        try:
            for i in range(interval):
                cur_start = start_zero_timestamp + i * one_day
                screen_result = models.Screen.objects \
                    .filter(device_id=device_id, timestamp__lt=cur_start + one_day, timestamp__gte=cur_start) \
                    .order_by('timestamp').values('timestamp', 'screen_status')
                screenList.append(screen_result)
                unlocked_date.append(cur_start)
        except:
            raise Http404

        unlocked_times = []
        unlocked_duration = []
        timestamp_now = int(time.time() * 1000)
        unlocked_flag = False

        # Get last screen status
        if len(screenList[0]) == 0:
            unlocked_result = models.Screen.objects \
                                  .filter(device_id=device_id, timestamp__lt=start_zero_timestamp) \
                                  .order_by('-timestamp').values('screen_status')[:1]
            if len(unlocked_result) != 0 and unlocked_result[0]['screen_status'] == 3:
                unlocked_flag = True

        # handle each day interval
        for i in range(interval):
            count = 0
            duration = 0
            len_screen = len(screenList[i])

            # unlocked cross a day,
            if len_screen != 0:
                # handle before off
                if screenList[i][0]['screen_status'] == 0 and unlocked_flag == True:
                    duration += screenList[i][0]['timestamp'] - unlocked_date[i]
                # handle after unlocked
                if screenList[i][len_screen - 1]['screen_status'] == 3:
                    # if the date is today
                    if (timestamp_now - one_day) < unlocked_date[i] < timestamp_now:
                        duration += timestamp_now - screenList[i][len_screen - 1]['timestamp']
                    else:
                        if unlocked_date[i] <= (timestamp_now - one_day):
                            duration += unlocked_date[i] + one_day - screenList[i][len_screen - 1]['timestamp']
                    unlocked_flag = True
                else:
                    unlocked_flag = False
            # unlocked over a day
            else:
                if unlocked_date[i] <= timestamp_now and unlocked_flag:
                    duration = one_day

            for j in range(len_screen):
                # unlocked
                if screenList[i][j]['screen_status'] == 3:
                    count += 1
                    x = j + 1  # value in list
                    y = i  # day in interval
                    # find first OFF or first locked
                    while x < len_screen:
                        if screenList[y][x]['screen_status'] == 0 or screenList[y][x]['screen_status'] == 2:
                            duration += screenList[y][x]['timestamp'] - screenList[i][j]['timestamp']
                            break
                        x += 1

            unlocked_times.append(count)
            duration = round(duration / one_min)
            unlocked_duration.append(duration)

        result = [unlocked_date, unlocked_times, unlocked_duration]
        print("3: ", datetime.datetime.fromtimestamp(int(1645891200000) / 1000))
        print("3: ", datetime.datetime.fromtimestamp(int(1645922052541) / 1000))
        print("3: ", datetime.datetime.fromtimestamp(int(1646187891078) / 1000))
        print("3: ", datetime.datetime.fromtimestamp(int(1646409600000) / 1000))
        print("3: ", timestamp_now)

        return Response(result)
