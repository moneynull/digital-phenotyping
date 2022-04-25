from django.urls import path
from . import views

urlpatterns = [
    path('', views.QuerySMS.as_view()),
]