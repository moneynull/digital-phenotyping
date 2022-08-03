import itertools
import collections

from utils import tw_cbd_credentials
import tweepy as tw
import nltk
from nltk.corpus import stopwords
import re

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
    nltk.download('stopwords')

    stop_words = set(stopwords.words('english'))

    return [[word for word in tweet_words if not word in stop_words]
              for tweet_words in words_in_tweet]

def get_recent_tweets(user_id):

    # authentication
    auth = tw.OAuthHandler(tw_cbd_credentials.consumer_key, tw_cbd_credentials.consumer_secret)
    auth.set_access_token(tw_cbd_credentials.access_token, tw_cbd_credentials.access_token_secret)
    api = tw.API(auth, wait_on_rate_limit=True)

    # get tweets from twitter
    tweets = tw.Cursor(api.user_timeline,
                    id=user_id).items(100)

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