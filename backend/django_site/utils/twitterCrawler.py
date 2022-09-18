from http.client import HTTPResponse
import itertools
import collections
import json

from django.core.serializers.json import DjangoJSONEncoder
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

class TimerView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
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
        res = {
            'success': True,
            'data': 'resetting'
        }
        return HTTPResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')

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

    # get tweets from twitter
    # tweets = tw.Cursor(api.user_timeline,
    #                 id=user_id).items(100)

    client = tw.Client(bearer_token=tw_cbd_credentials.bearer_token)
    max_length = 100
    tweets = client.get_users_tweets(id=user_id,max_results=max_length).data

    all_tweets = [tweet.text for tweet in tweets]

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

    return counts_rsw_nc