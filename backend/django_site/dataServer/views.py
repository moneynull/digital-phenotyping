import json
import datetime
import time
import utils.twitterCrawler as tc

from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse, HttpResponseBadRequest

# Create your views here.
from dataServer import models

one_day = 86400000

def extract_twitter_keywords(request):
    if request.method != 'GET':
        return HttpResponseBadRequest
    req = json.loads(request.body.decode().replace("'", "\""))
    uid = req.get('id')
    twitter_id = models.TbClient.objects.get(uid=uid).twitter_id

    # the following code is for get twitter id based on twitter username
    # it will be used in the profile page
    # ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    # client = tweepy.Client(bearer_token=bearer_token)
    # username = "" # Username is what client inputs
    # twitter_id = client.get_user(username=username).data.id
    # 

    records = models.TwitterWordCloud.objects.filter(twitter_id=twitter_id).values_list('word','occurance')

    res = {
        'success': True,
        'data': dict(list(records))
    }
    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')

def extract_message(request):
    if request.method == 'POST':
        req = json.loads(request.body.decode().replace("'", "\""))
        uid = req.get('uid')
        start_date_stamp = req.get('startDate')
        end_date_stamp = req.get('endDate')
    else:
        uid = 0

    device_result = models.TbClient.objects.filter(uid=uid).values("aware_device_id")
    device_id = device_result[0]["aware_device_id"]

    start_date = datetime.datetime.fromtimestamp(int(start_date_stamp) / 1000)
    end_date = datetime.datetime.fromtimestamp(int(end_date_stamp) / 1000)

    date_interval = end_date - start_date

    start_date_timestamp = int(time.mktime(start_date.timetuple()) * 1000)
    end_date_timestamp = int(time.mktime(end_date.timetuple()) * 1000)

    calls_result = models.Calls.objects \
        .filter(device_id=device_id, timestamp__lt=end_date_timestamp, timestamp__gte=start_date_timestamp) \
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