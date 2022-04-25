import json
import datetime
import time

from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from django.shortcuts import render
from django.db import connection, connections

# Create your views here.
from dataServer import models


def toLogin_view(request):
    return render(request, 'testDemo.html')


def read_user(request):
    data = serializers.serialize('python', models.TbClient.objects.filter(uid=1))
    res = {
        'success': True,
        'data': data
    }
    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')


one_day = 86400000


def extract_message(request):
    if request.method == 'POST':
        uid = json.loads(request.body.decode().replace("'", "\"")).get('uid')
        start_date_stamp = json.loads(request.body.decode().replace("'", "\"")).get('startDate')
        end_date_stamp = json.loads(request.body.decode().replace("'", "\"")).get('endDate')
    else:
        uid = 0

    device_result = models.TbClient.objects.filter(uid=uid).values("awaredeviceid")
    device_id = device_result[0]["awaredeviceid"]

    start_date = datetime.datetime.fromtimestamp(int(start_date_stamp) / 1000)
    end_date = datetime.datetime.fromtimestamp(int(end_date_stamp) / 1000)

    date_interval = end_date - start_date

    start_date_timestamp = int(time.mktime(start_date.timetuple()) * 1000)
    print(start_date_timestamp)
    end_date_timestamp = int(time.mktime(end_date.timetuple()) * 1000)
    print(end_date_timestamp)

    calls_result = models.Calls.objects \
        .filter(device_id=device_id, timestamp__lte=end_date_timestamp, timestamp__gte=start_date_timestamp) \
        .values("timestamp", "call_type", "call_duration", "field_id").order_by("timestamp")

    print(len(calls_result))
    print(calls_result[0]["call_type"], calls_result[0]["call_duration"])

    data = calls_process(calls_result, start_date_timestamp, date_interval)

    res = {
        'success': True,
        'data': data
    }
    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')


def calls_process(calls_result, start_date_stmp, date_interval):
    res_array = [[] for i in range(3)]
    for i in range(date_interval.days):
        res_array[0].append(0)
    for i in range(date_interval.days):
        res_array[1].append(0)
    for i in range(date_interval.days):
        res_array[2].append(0)

    i = 0  # represent the data type as index
    j = 0  # represent the days index
    res_day = []
    count = 0
    print('start_date_stmp: %s', start_date_stmp)
    for r in calls_result:
        if start_date_stmp + j * one_day <= r["timestamp"] < start_date_stmp + (j + 1) * one_day:
            i = r["call_type"] - 1
            res_array[i][j] += 1
        else:
            if j <= date_interval.days:
                res_day.append(datetime.datetime.fromtimestamp(int(start_date_stmp + j * one_day) / 1000))
                j = j + 1

    res_array.append(res_day)
    return res_array
