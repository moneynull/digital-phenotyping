from django.urls import path
from . import views

urlpatterns = [
    path('ScreenUnlocked', views.ScreenUnlocked.as_view()),
    path('NumberOfScreen', views.ScreenUnlockedTimes.as_view()),
]
