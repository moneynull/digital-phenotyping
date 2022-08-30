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
    twitter_idList = models.TbClient.objects.values("twitter_id")

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
    
def retrieve_2weeks_tweets_manul(id):
    
    try:
        
        word_cloud = dict(get_recent_tweets(id))
        # print(type(word_cloud))
        # print(word_cloud.items()[0])
    
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
            for word,occurrence in word_cloud.items():
                models.TwitterWordCloud.objects.create(
                    twitter_id=id,
                    word=word,
                    occurrence=occurrence
                )
                
    except:
        raise Http404


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
    print("1")

    all_tweets = [tweet.text for tweet in tweets]

    print(all_tweets[:5])

    all_tweets_no_urls = [remove_url(tweet) for tweet in all_tweets]

    print(all_tweets_no_urls[:5])

    # Create a list of lists containing lowercase words for each tweet
    words_in_tweet = [tweet.lower().split() for tweet in all_tweets_no_urls]
    print(words_in_tweet[:2])

    # remove stop words
    tweets_rsw = remove_stop_words(words_in_tweet)

    # remove collection words (no need)
    collection_words = ['']
    tweets_rsw_nc = remove_collction_words(tweets_rsw, collection_words)

    # Flatten list of words in clean tweets
    all_words_rsw_nc = list(itertools.chain(*tweets_rsw_nc))

    # Create counter of words in clean tweets
    counts_rsw_nc = collections.Counter(all_words_rsw_nc)

    print(counts_rsw_nc.most_common())

    return counts_rsw_nc