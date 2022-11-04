
from django.http import Http404
import tweepy

from google_play_scraper.exceptions import NotFoundError
from google_play_scraper import app as google_app
from appForeground.models import ApplicationsForeground
from locationServer.views import PreProcessLocation
import environ

import datetime
from twitterDataServer.views import *
from twitterDataServer import models
from utils import tw_cbd_credentials

# use this to run crontasks under the background
from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore, register_events, register_job

env = environ.Env()
scheduler = BackgroundScheduler()
scheduler.add_jobstore(DjangoJobStore(), "default", misfire_grace_time=300)

@register_job(scheduler, "interval", minutes=int(env('CATEGORY_SCHEDULE')))
def app_category():
    appCategory()

@register_job(scheduler, "interval", minutes=int(env('TWITTER_TWEET_SCHEDULE')))
def retrieve_2weeks_tweets():
    retrieve_2weeks_tweets()

@register_job(scheduler, "interval", minutes=int(env('LOCATION_SCHEDULE')))
def initial_process_location():
    PreProcessLocation.initialProcessLocation()

@register_job(scheduler, "interval", minutes=int(env('TWITTER_SCHEDULE')))
def twitter_data():
    twitter_data()

try:
    scheduler.start()

except Exception as e:
    scheduler.shutdown()
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
    auth = tweepy.OAuthHandler(tw_cbd_credentials.consumer_key, tw_cbd_credentials.consumer_secret)
    auth.set_access_token(tw_cbd_credentials.access_token, tw_cbd_credentials.access_token_secret)
    api = tweepy.API(auth, wait_on_rate_limit=True)

def appCategory():
    exists_result = ApplicationsForeground.objects.filter(category__isnull=False)
    exists_dic = dict(list(exists_result.values_list("package_name", "category").distinct()))
    empty_result = ApplicationsForeground.objects.filter(category__isnull=True)
    for empty in empty_result:
        if empty.package_name in exists_dic.keys():
            empty.category = exists_dic[empty.package_name]

    ApplicationsForeground.objects.bulk_update(empty_result, fields=['category'])

    # scrape google->update null
    update_result = ApplicationsForeground.objects.filter(category__isnull=True)
    update_dic = dict(list(update_result.values_list("package_name", "category").distinct()))

    for r in update_result.values("package_name", "category").distinct():
        try:
            google_info = google_app(r['package_name'])
            update_dic[r['package_name']] = google_info['genre']
        except NotFoundError:
            r['category'] = "None"

    for update in update_result:
        if update.package_name in update_dic.keys():
            update.category = update_dic[update.package_name]

    ApplicationsForeground.objects.bulk_update(update_result, fields=['category'])

def twitter_data():

    twitter_id_int_result = models.TbClient.objects.values("twitter_id_int")
    env = environ.Env()

    now = datetime.datetime.now()

    start_date = now - datetime.timedelta(hours = int(env('TWITTER_SCHEDULE')))

    for i in twitter_id_int_result:
        client = tweepy.Client(bearer_token=tw_cbd_credentials.bearer_token)

        hashtag_dict = {}
        context_annotations_dict = {}
        all_tweets = []

        for tweet in tweepy.Paginator(client.get_users_tweets, \
                                      id=i, start_time=start_date, tweet_fields=['entities','context_annotations']) \
                .flatten(limit=1000):
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
                        print(key)
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

        store_hashtag(i, hashtag_dict)
        store_word_cloud(i, dict_counts_rsw_nc)
        store_context_annotations(i, context_annotations_dict)

        result_list = [hashtag_dict, dict_counts_rsw_nc, context_annotations_dict]

        res = set_res(True, result_list)