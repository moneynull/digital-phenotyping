from django.shortcuts import render
import json
import datetime
import time
import utils.twitterCrawler as tc

from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse, HttpResponseBadRequest

from twitterDataServer import models

# Create your views here.
def extract_twitter_keywords(request):
    if request.method != 'POST':
        return HttpResponseBadRequest
    req = json.loads(request.body.decode().replace("'", "\""))
    uid = req.get('uid')
    twitter_id = models.TbClient.objects.filter(uid=uid).values('twitter_id_int')

    if len(twitter_id) == 0:
        return HttpResponse(json.dumps("twitter id of this user not exists!", cls=DjangoJSONEncoder),
                            content_type='application/json')


    records = models.TwitterWordCloud.objects\
        .filter(twitter_id=twitter_id[0]['twitter_id_int']).values_list('word', 'occurrence')

    res = {
        'success': True,
        'data': dict(list(records))
    }
    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')