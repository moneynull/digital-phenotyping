#
# import environ
#
# import datetime
#
# # use this to run crontasks under the background
# from apscheduler.schedulers.background import BackgroundScheduler
# from django_apscheduler.jobstores import DjangoJobStore, register_events, register_job
# from twitterDataServer.views import *
# from twitterDataServer import models
# from utils import tw_cbd_credentials
# import tweepy
#
# try:
#     env = environ.Env()
#     scheduler = BackgroundScheduler()
#     scheduler.add_jobstore(DjangoJobStore(), "default")
#
#     @register_job(scheduler, "interval", hours=env('TWITTER_SCHEDULE'))
#     def test_job():
#         twitter_data()
#
#     register_events(scheduler)
#     scheduler.start()
#
# except Exception as e:
#     print('Location Service CronTask Exception：%s' % str(e))
#
#
# def twitter_data():
#
#     twitter_id_int_result = models.TbClient.objects.values("twitter_id_int")
#     env = environ.Env()
#
#     now = datetime.datetime.now()
#
#     start_date = now - datetime.timedelta(hours = int(env('TWITTER_SCHEDULE')))
#
#     for i in twitter_id_int_result:
#         client = tweepy.Client(bearer_token=tw_cbd_credentials.bearer_token)
#
#         hashtag_dict = {}
#         context_annotations_dict = {}
#         all_tweets = []
#
#         for tweet in tweepy.Paginator(client.get_users_tweets, \
#             id=i, start_time=start_date, tweet_fields=['entities','context_annotations'])\
#                 .flatten(limit=1000):
#             all_tweets.append(tweet.text)
#             for tag, values in tweet.data.items():
#                 if tag == 'context_annotations':
#                     for item in values:
#                         for key, value in item.items():
#                             if key == 'entity':
#                                 topic = value['name']
#                                 if topic not in context_annotations_dict:
#                                     context_annotations_dict[topic] = 1
#                                 else:
#                                     context_annotations_dict[topic] += 1
#
#                 elif tag == 'entities':
#                     for key, value in values.items():
#                         print(key)
#                         if key == 'hashtags':
#                             for hashtag in value:
#                                 hashtag_lower = hashtag['tag'].lower()
#                                 if hashtag_lower not in hashtag_dict:
#                                     hashtag_dict[hashtag_lower] = 1
#                                 else:
#                                     hashtag_dict[hashtag_lower] += 1
#
#         all_tweets_no_urls = [remove_url(tweet) for tweet in all_tweets]
#
#         # Create a list of lists containing lowercase words for each tweet
#         words_in_tweet = [tweet.lower().split() for tweet in all_tweets_no_urls]
#
#         # remove stop words
#         tweets_rsw = remove_stop_words(words_in_tweet)
#
#         # remove collection words (no need)
#         collection_words = ['']
#         tweets_rsw_nc = remove_collction_words(tweets_rsw, collection_words)
#
#         # Flatten list of words in clean tweets
#         all_words_rsw_nc = list(itertools.chain(*tweets_rsw_nc))
#
#         # Create counter of words in clean tweets
#         counts_rsw_nc = collections.Counter(all_words_rsw_nc)
#
#         dict_counts_rsw_nc = dict(counts_rsw_nc)
#
#         store_hashtag(i, hashtag_dict)
#         store_word_cloud(i, dict_counts_rsw_nc)
#         store_context_annotations(i, context_annotations_dict)
#
#         result_list = [hashtag_dict, dict_counts_rsw_nc, context_annotations_dict]
#
#         res = set_res(True, result_list)