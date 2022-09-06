from django.shortcuts import render
from rest_framework.response import Response
import json
import datetime
import time
import utils.twitterCrawler as tc
from utils import tw_cbd_credentials

from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse, HttpResponseBadRequest

from twitterDataServer import models

import tweepy

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

def extract_twitter_hashtag(request):
    if request.method != 'POST':
        return HttpResponseBadRequest
    req = json.loads(request.body.decode().replace("'", "\""))
    uid = req.get('uid')
    
    client = tweepy.Client(bearer_token=tw_cbd_credentials.bearer_token)
    # twitter_id = client.get_user(username=uid).data.id

    # tweets = client.get_users_tweets(id=uid)
    # print(tweets)

    # auth = tweepy.OAuthHandler(tw_cbd_credentials.consumer_key, tw_cbd_credentials.consumer_secret)
    # api = tweepy.API(auth)
    hashtag_list = []

    for tweet in tweepy.Paginator(client.get_users_tweets, id=uid, tweet_fields=['entities']):
        print(tweet)
        for tweets in tweet.data:
            if tweets['entities'] is not None:
                for key, value in tweets['entities'].items():
                    if key == 'hashtags':
                        for hashtag in value:
                            if hashtag['tag'] not in hashtag_list:
                                hashtag_list.append(hashtag['tag'])
                                print(hashtag['tag'])

    print(hashtag_list)

    res = {
        'success': True,
        'data': None
    }

    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')