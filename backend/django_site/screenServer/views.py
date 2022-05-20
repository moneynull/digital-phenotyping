from django.http import Http404
from django.shortcuts import render

# Create your views here.
import json

from rest_framework.response import Response
from rest_framework.views import APIView

from screenServer import models

from locationServer.views import PreProcessLocation

one_day = 86400000


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
                cur_end = cur_start + one_day
                screen_result = models.Screen.objects \
                    .filter(device_id=device_id, timestamp__lt=cur_end, timestamp__gte=cur_start) \
                    .order_by('timestamp').values('timestamp', 'screen_status')
                screenList.append(screen_result)
                unlocked_date.append(cur_start)
                print(i, cur_start, cur_end)
        except:
            raise Http404

        unlocked_times = []
        unlocked_duration = []

        for i in range(interval):
            count = 0
            duration = 0
            for j in range(len(screenList[i])):
                if screenList[i][j]['screen_status'] == 2:
                    count += 1

            unlocked_times.append(count)

        result = [unlocked_date, unlocked_times, unlocked_duration]
        print(unlocked_times)

        return Response(result)
