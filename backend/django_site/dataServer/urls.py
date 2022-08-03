from django.urls import path

from dataServer import views

urlpatterns = [
    path('calls', views.extract_message),
    path('twitter_demo', views.extract_twitter_keywords)
]
