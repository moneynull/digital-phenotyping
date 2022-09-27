from django.urls import path

from callServer import views

urlpatterns = [
    path('calls', views.CallsInfo.as_view()),
    path('callsTrace', views.CallsTrace.as_view())
]
