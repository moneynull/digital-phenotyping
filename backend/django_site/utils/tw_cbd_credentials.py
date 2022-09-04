import os
import environ

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

consumer_key = env('consumer_key')
consumer_secret = env('consumer_secret')
access_token = env('access_token')
access_token_secret = env('access_token_secret')
bearer_token = env('bearer_token')
