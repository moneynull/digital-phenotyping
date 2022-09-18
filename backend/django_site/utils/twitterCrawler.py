import itertools
import collections

from django.http import Http404
from dataServer import models

from utils import tw_cbd_credentials
import tweepy as tw
import nltk
from nltk.corpus import stopwords
import re

import os

# use this to run crontasks under the background
from apscheduler.schedulers.background import BackgroundScheduler 
from django_apscheduler.jobstores import DjangoJobStore, register_events, register_job
import time


try:
    scheduler = BackgroundScheduler()
    scheduler.add_jobstore(DjangoJobStore(), "default")

    @register_job(scheduler, "interval", hours=72)
    def test_job():
        # run every 2 weeks
        retrieve_2weeks_tweets()

    register_events(scheduler)
    scheduler.start()
    
except Exception as e:
    print('CronTask Exception：%s' % str(e))


# retrieve the latest 2 weeks tweets in the database
def retrieve_2weeks_tweets():
    twitter_idList = models.TbClient.objects.values("twitter_id_int")

    try:
        for id in twitter_idList:
            word_cloud = dict(get_recent_tweets(id))
        
            if models.TwitterWordCloud.objects.filter(twitter_id=id).exists():
                for (word, occurrence) in word_cloud.items():
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
                for (word, occurrence) in word_cloud.items():
                    models.TwitterWordCloud.objects.create(
                        twitter_id=id,
                        word=word,
                        occurrence=occurrence
                    )
                
    except:
        raise Http404
    

def get_recent_tweets(user_id):

    # authentication
    auth = tw.OAuthHandler(tw_cbd_credentials.consumer_key, tw_cbd_credentials.consumer_secret)
    auth.set_access_token(tw_cbd_credentials.access_token, tw_cbd_credentials.access_token_secret)
    api = tw.API(auth, wait_on_rate_limit=True)