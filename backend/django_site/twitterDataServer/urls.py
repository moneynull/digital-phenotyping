from django.urls import path
from twitterDataServer import views

urlpatterns = [
    path('twitterWordCloud', views.extract_twitter_keywords),
    path('twitterHashtag', views.extract_twitter_hashtag)
]
