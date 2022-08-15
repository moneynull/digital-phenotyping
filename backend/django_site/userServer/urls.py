from django.urls import path
from . import views

urlpatterns = [
    path('ClientInfoList', views.ClientInfoList.as_view()),
    path('ClientProfile', views.ClientProfile.as_view()),
    path('ChangeProfile', views.ChangeProfile.as_view()),
    path('AddClient', views.AddClient.as_view()),
    path('DeleteClient', views.DeleteClient.as_view()),
]
