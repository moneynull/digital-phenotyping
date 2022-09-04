from django.urls import path

from dataServer import views

urlpatterns = [
    path('calls', views.extract_message),
    path('twitterWordCloud', views.extract_twitter_keywords)
]
