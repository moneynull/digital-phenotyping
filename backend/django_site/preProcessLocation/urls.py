from django.urls import path
from . import views

urlpatterns = [
    path('', views.PreProcessLocation.as_view()),
]