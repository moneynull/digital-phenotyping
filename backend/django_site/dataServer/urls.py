from django.urls import path

from dataServer import views

urlpatterns = [
    path('calls', views.extract_message),
    path('locData', views.cal_cen_loc)
]
