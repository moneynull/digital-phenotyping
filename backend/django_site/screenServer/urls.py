from django.urls import path
from . import views

urlpatterns = [
    path('ScreenUnlocked', views.ScreenUnlocked.as_view()),
    path('UnlockedDuration', views.UnlockedDuration.as_view())
]
