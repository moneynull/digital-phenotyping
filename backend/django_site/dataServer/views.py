import json
import datetime
import time

import pandas as pd
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from django.shortcuts import render
from django.db import connection, connections

import requests
from math import sin, asin, cos, sqrt, radians
import numpy
import matplotlib
import pylab
from scipy.cluster.vq import kmeans2, whiten

from scipy.spatial.distance import pdist, squareform
from sklearn.cluster import DBSCAN
import matplotlib.pyplot as plt

# Create your views here.
from dataServer import models
from dataServer.test_loc import clustering_by_dbscan_and_kmeans2, clustering_by_dbscan

one_day = 86400000


def extract_message(request):
    if request.method == 'POST':
        req = json.loads(request.body.decode().replace("'", "\""))
        uid = req.get('uid')
        start_date_stamp = req.get('startDate')
        end_date_stamp = req.get('endDate')
    else:
        uid = 0

    device_result = models.TbClient.objects.filter(uid=uid).values("awaredeviceid")
    device_id = device_result[0]["awaredeviceid"]

    start_date = datetime.datetime.fromtimestamp(int(start_date_stamp) / 1000)
    end_date = datetime.datetime.fromtimestamp(int(end_date_stamp) / 1000)

    date_interval = end_date - start_date

    start_date_timestamp = int(time.mktime(start_date.timetuple()) * 1000)
    end_date_timestamp = int(time.mktime(end_date.timetuple()) * 1000)

    calls_result = models.Calls.objects \
        .filter(device_id=device_id, timestamp__lte=end_date_timestamp, timestamp__gte=start_date_timestamp) \
        .values("timestamp", "call_type", "call_duration", "field_id").order_by("timestamp")

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
    for j in range(date_interval.days):
        for r in calls_result:
            if start_date_stmp + j * one_day <= r["timestamp"] < start_date_stmp + (j + 1) * one_day:
                res_array[r["call_type"] - 1][j] += 1
            else:
                continue
        res_day.append(datetime.datetime.fromtimestamp(int(start_date_stmp + j * one_day) / 1000))

    res_array.append(res_day)
    return res_array

#how long for the distance count for changing one place
#what about go through some place like park or just short stop in one place like shop
#The time interval of the numbers chart

def cal_cen_loc(request):
    if request.method == 'POST':
        req = json.loads(request.body.decode().replace("'", "\""))
        uid = req.get('uid')
        start_date_stamp = req.get('startDate')
        end_date_stamp = req.get('endDate')
    else:
        uid = 0

    device_result = models.TbClient.objects.filter(uid=uid).values("awaredeviceid")
    device_id = device_result[0]["awaredeviceid"]

    location_results = models.Locations.objects.filter(device_id=device_id)\
        .exclude(double_latitude=0).exclude(double_longitude=0).values("double_latitude", "double_longitude")
    print(len(location_results))

    latitude_list = []
    longitude_list = []
    for l in location_results:
        latitude_list.append(l['double_latitude'])
        longitude_list.append(l['double_longitude'])
    result_dic={"double_latitude":latitude_list,"double_longitude":longitude_list}
    clustering_by_dbscan_and_kmeans2(result_dic)
    #clustering_by_dbscan(result_dic)
    res = {
        'success': True,
        # 'data': data
    }
    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')
