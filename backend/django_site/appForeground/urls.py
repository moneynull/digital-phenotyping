from django.urls import path
from appForeground import views

urlpatterns = [
    path('', views.AppForeground.as_view()),
    path('AppCategory', views.AppCategory.as_view())
]
