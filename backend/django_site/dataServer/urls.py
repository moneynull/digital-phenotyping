from django.urls import path

from dataServer import views

urlpatterns = [
    path('', views.toLogin_view),
    path('readUser',views.read_user),
    path('calls',views.extract_message)
]