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

from django.http import Http404

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

def store_hashtag(id, hashtag_list):
    
    try:

        if models.TwitterHashtag.objects.filter(twitter_id_int=id).exists():
            for hashtag in hashtag_list:
                if models.TwitterHashtag.objects.filter(twitter_id_int=id,hashtag=hashtag).exists():
                    continue
                else:
                    models.TwitterHashtag.objects.create(
                        twitter_id_int=id,
                        hashtag=hashtag
                    )

        else:
            for hashtag in hashtag_list:
                models.TwitterHashtag.objects.create(
                    twitter_id_int=id,
                    hashtag=hashtag
                )
                
    except:
        raise Http404

def extract_twitter_hashtag(request):
    if request.method != 'POST':
        return HttpResponseBadRequest
    req = json.loads(request.body.decode().replace("'", "\""))
    uid = req.get('uid')
    print(uid)

    twitter_id_int_result = models.TbClient.objects.filter(uid=uid).values("twitter_id_int")

    if len(twitter_id_int_result) == 0:
        res = {
            'success': False,
            'data': 'User does not exists'
        }
        return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')
    else:
        twitter_id_int = twitter_id_int_result[0]["twitter_id_int"]

    print(twitter_id_int)
    
    client = tweepy.Client(bearer_token=tw_cbd_credentials.bearer_token)
    # twitter_id = client.get_user(username=uid).data.id

    # tweets = client.get_users_tweets(id=uid)
    # print(tweets)

    # auth = tweepy.OAuthHandler(tw_cbd_credentials.consumer_key, tw_cbd_credentials.consumer_secret)
    # api = tweepy.API(auth)
    hashtag_list = []

    for tweet in tweepy.Paginator(client.get_users_tweets, id=twitter_id_int, tweet_fields=['entities']):
        print(tweet)
        for tweets in tweet.data:
            if tweets['entities'] is not None:
                for key, value in tweets['entities'].items():
                    if key == 'hashtags':
                        for hashtag in value:
                            if hashtag['tag'] not in hashtag_list:
                                hashtag_list.append(hashtag['tag'])
                                print(hashtag['tag'])

    store_hashtag(twitter_id_int, hashtag_list)
    print(hashtag_list)

    res = {
        'success': True,
        'data': hashtag_list
    }

    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')

