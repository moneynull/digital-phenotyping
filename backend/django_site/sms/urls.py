from django.urls import path
from sms import views

urlpatterns = [
    path('', views.QuerySMS.as_view()),
]