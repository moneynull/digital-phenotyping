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

from django.http import Http404

import tweepy

from django.http import Http404

import itertools
import collections
import os
import re

from apscheduler.schedulers.background import BackgroundScheduler 
from django_apscheduler.jobstores import DjangoJobStore, register_events, register_job
import time

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

def extract_twitter_hashtags(request):
    if request.method != 'POST':
        return HttpResponseBadRequest
    req = json.loads(request.body.decode().replace("'", "\""))
    uid = req.get('uid')
    twitter_id = models.TbClient.objects.filter(uid=uid).values('twitter_id_int')

    if len(twitter_id) == 0:
        return HttpResponse(json.dumps("twitter id of this user not exists!", cls=DjangoJSONEncoder),
                            content_type='application/json')


    records = models.TwitterHashtag.objects\
        .filter(twitter_id_int=twitter_id[0]['twitter_id_int']).values_list('hashtag', 'occurrence')

    unsorted_return_data = dict(list(records))

    sorted_return_data = dict(sorted(unsorted_return_data.items(), key=lambda item: item[1], reverse=True))

    res = {
        'success': True,
        'data': sorted_return_data
    }
    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')

def store_hashtag(id, hashtag_dict):
    
    try:

        if models.TwitterHashtag.objects.filter(twitter_id_int=id).exists():
            for hashtag, occurrence in hashtag_dict.items():
                if models.TwitterHashtag.objects.filter(twitter_id_int=id,hashtag=hashtag).exists():
                    record = models.TwitterHashtag.objects.get(twitter_id_int=id,hashtag=hashtag)
                    record.occurrence = record.occurrence + occurrence
                    record.save()
                else:
                    models.TwitterHashtag.objects.create(
                        twitter_id_int=id,
                        hashtag=hashtag,
                        occurrence=occurrence
                    )

        else:
            for hashtag,occurrence in hashtag_dict.items():
                models.TwitterHashtag.objects.create(
                    twitter_id_int=id,
                    hashtag=hashtag,
                    occurrence=occurrence
                )
                
    except:
        raise Http404

def store_word_cloud(id, word_cloud_dict):
    
    try:
        if models.TwitterWordCloud.objects.filter(twitter_id=id).exists():
            for word, occurrence in word_cloud_dict.items():
                if models.TwitterWordCloud.objects.filter(twitter_id=id,word=word).exists():
                    record = models.TwitterWordCloud.objects.get(twitter_id=id,word=word)
                    record.occurrence = record.occurrence + occurrence
                    record.save()
                else:
                    models.TwitterWordCloud.objects.create(
                        twitter_id=id,
                        word=word,
                        occurrence=occurrence
                    )
        else:
            for word,occurrence in word_cloud_dict.items():
                models.TwitterWordCloud.objects.create(
                    twitter_id=id,
                    word=word,
                    occurrence=occurrence
                )
                
    except:
        raise Http404

def process_twitter_data(request):
    if request.method != 'POST':
        return HttpResponseBadRequest
    req = json.loads(request.body.decode().replace("'", "\""))
    uid = req.get('uid')

    twitter_id_int_result = models.TbClient.objects.filter(uid=uid).values("twitter_id_int")

    if len(twitter_id_int_result) == 0:
        res = {
            'success': False,
            'data': 'User does not exists'
        }
        return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')
    else:
        twitter_id_int = twitter_id_int_result[0]["twitter_id_int"]
    
    client = tweepy.Client(bearer_token=tw_cbd_credentials.bearer_token)
    # twitter_id = client.get_user(username=uid).data.id

    # tweets = client.get_users_tweets(id=uid)
    # print(tweets)

    # auth = tweepy.OAuthHandler(tw_cbd_credentials.consumer_key, tw_cbd_credentials.consumer_secret)
    # api = tweepy.API(auth)
    hashtag_dict = {}
    all_tweets = []

    for tweet in tweepy.Paginator(client.get_users_tweets,\
        id=twitter_id_int, tweet_fields=['entities']).flatten(limit=100):
        all_tweets.append(tweet.text)
        for tag, values in tweet.data.items():
            if tag == 'entities':
                for key, value in values.items():
                    if key == 'hashtags':
                        for hashtag in value:
                            hashtag_lower = hashtag['tag'].lower()
                            if hashtag_lower not in hashtag_dict:
                                hashtag_dict[hashtag_lower] = 1
                            else:
                                hashtag_dict[hashtag_lower] += 1

    all_tweets_no_urls = [remove_url(tweet) for tweet in all_tweets]

    # Create a list of lists containing lowercase words for each tweet
    words_in_tweet = [tweet.lower().split() for tweet in all_tweets_no_urls]

    # remove stop words
    tweets_rsw = remove_stop_words(words_in_tweet)

    # remove collection words (no need)
    collection_words = ['']
    tweets_rsw_nc = remove_collction_words(tweets_rsw, collection_words)

    # Flatten list of words in clean tweets
    all_words_rsw_nc = list(itertools.chain(*tweets_rsw_nc))

    # Create counter of words in clean tweets
    counts_rsw_nc = collections.Counter(all_words_rsw_nc)

    dict_counts_rsw_nc = dict(counts_rsw_nc)

    store_hashtag(twitter_id_int, hashtag_dict)
    store_word_cloud(twitter_id_int, dict_counts_rsw_nc)

    result_list = [hashtag_dict, dict_counts_rsw_nc]

    res = {
        'success': True,
        'data': result_list
    }

    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')

# remove collection words
def remove_collction_words(tweets, collection_words):
    return [[w for w in word if not w in collection_words]
                 for word in tweets]

"""Replace URLs found in a text string with nothing 
(i.e. it will remove the URL from the string).

Parameters
----------
txt : string
    A text string that you want to parse and remove urls.

Returns
-------
The same txt string with url's removed.
"""
def remove_url(txt):
    return " ".join(re.sub("([^0-9A-Za-z \t])|(\w+:\/\/\S+)", "", txt).split())

# Remove stop words from each tweet list of words
# usage conts_rsw.most_common(15)
def remove_stop_words(words_in_tweet):
    module_path = os.path.dirname(__file__)
    file_path = os.path.join(module_path, 'stopwords_list.txt')
    stopwords_file = open(file_path,"r")
    try:
        content = stopwords_file.read()
        stopwords_list = content.split(",")
    finally:
        stopwords_file.close()
    
    stopwords = [word.replace('"','').replace(' ','') for word in stopwords_list]
    # nltk.download('stopwords')

    # stop_words = set(stopwords.words('english'))

    return [[word for word in tweet_words if not word in stopwords]
              for tweet_words in words_in_tweet]