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

def set_res(success_tag, return_data):
    res = {
        'success': success_tag,
        'data': return_data
    }
    return res

def extract_twitter_keywords(request):
    if request.method != 'POST':
        return HttpResponseBadRequest
    req = json.loads(request.body.decode().replace("'", "\""))
    uid = req.get('uid')
    twitter_id = models.TbClient.objects.filter(uid=uid).values('twitter_id_int')

    if len(twitter_id) == 0:
        res = set_res(False, "twitter id of this user not exists!")
        return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')


    records = models.TwitterWordCloud.objects\
        .filter(twitter_id=twitter_id[0]['twitter_id_int']).values_list('word', 'occurrence')

    res = set_res(True, dict(list(records)))

    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')

def extract_twitter_hashtags(request):
    if request.method != 'POST':
        return HttpResponseBadRequest
    req = json.loads(request.body.decode().replace("'", "\""))
    uid = req.get('uid')
    twitter_id = models.TbClient.objects.filter(uid=uid).values('twitter_id_int')

    if len(twitter_id) == 0:
        res = set_res(False, "twitter id of this user not exists!")
        return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder),
                            content_type='application/json')


    records = models.TwitterHashtag.objects\
        .filter(twitter_id_int=twitter_id[0]['twitter_id_int']).values_list('hashtag', 'occurrence')

    unsorted_return_data = dict(list(records))

    sorted_return_data = dict(sorted(unsorted_return_data.items(), key=lambda item: item[1], reverse=True))

    res = set_res(True, sorted_return_data)

    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')


def extract_twitter_topics(request):

    if request.method != 'POST':
        return HttpResponseBadRequest
    req = json.loads(request.body.decode().replace("'", "\""))
    uid = req.get('uid')
    twitter_id = models.TbClient.objects.filter(uid=uid).values('twitter_id_int')

    if len(twitter_id) == 0:
        res = set_res(False, "twitter id of this user not exists!")
        return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder),
                            content_type='application/json')

    records = models.TwitterTopics.objects\
        .filter(twitter_id_int=twitter_id[0]['twitter_id_int']).values_list('topic', 'occurrence')

    unsorted_return_data = dict(list(records))

    sorted_return_data = dict(sorted(unsorted_return_data.items(), key=lambda item: item[1], reverse=True))

    res = set_res(True, sorted_return_data)

    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')


def store_hashtag(id, hashtag_dict):
    
    try:

        if models.TwitterHashtag.objects.filter(twitter_id_int=id).exists():
            models.TwitterHashtag.objects.filter(twitter_id_int=id).delete()

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
            models.TwitterWordCloud.objects.filter(twitter_id=id).delete()
            
        for word,occurrence in word_cloud_dict.items():
            models.TwitterWordCloud.objects.create(
                twitter_id=id,
                word=word,
                occurrence=occurrence
            )
                
    except:
        raise Http404


def store_context_annotations(id, annotations_dict):
    
    try:
        if models.TwitterTopics.objects.filter(twitter_id_int=id).exists():
            models.TwitterTopics.objects.filter(twitter_id_int=id).delete()

        for topic,occurrence in annotations_dict.items():
            models.TwitterTopics.objects.create(
                twitter_id_int=id,
                topic=topic,
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
        res = set_res(False, 'User does not exists')
        return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')
    else:
        twitter_id_int = twitter_id_int_result[0]["twitter_id_int"]
    
    client = tweepy.Client(bearer_token=tw_cbd_credentials.bearer_token)

    now = datetime.datetime.now()

    start_date = now - datetime.timedelta(hours = int(tw_cbd_credentials.twitter_schedule))

    # twitter_id = client.get_user(username=uid).data.id

    # tweets = client.get_users_tweets(id=uid)
    # print(tweets)

    # auth = tweepy.OAuthHandler(tw_cbd_credentials.consumer_key, tw_cbd_credentials.consumer_secret)
    # api = tweepy.API(auth)

    hashtag_dict = {}
    context_annotations_dict = {}
    all_tweets = []

    for tweet in tweepy.Paginator(client.get_users_tweets,\
        id=twitter_id_int, start_time=start_date, tweet_fields=['entities','context_annotations']).flatten(limit=1000):
        all_tweets.append(tweet.text)
        for tag, values in tweet.data.items():
            if tag == 'context_annotations':
                for item in values:
                    for key, value in item.items():
                        if key == 'entity':
                            topic = value['name']
                            if topic not in context_annotations_dict:
                                context_annotations_dict[topic] = 1
                            else:
                                context_annotations_dict[topic] += 1
                    
            elif tag == 'entities':
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
    store_context_annotations(twitter_id_int, context_annotations_dict)

    result_list = [hashtag_dict, dict_counts_rsw_nc, context_annotations_dict]

    res = set_res(True, result_list)

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