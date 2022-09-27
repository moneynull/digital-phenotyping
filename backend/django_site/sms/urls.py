from django.urls import path
from sms import views

urlpatterns = [
    path('', views.QuerySMS.as_view()),
    path('smsTrace', views.smsTrace.as_view()),
]