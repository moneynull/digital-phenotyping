from django.urls import path
from . import views

urlpatterns = [
    path('PreProcessLocation', views.PreProcessLocation.as_view()),
    path('NumbersOfLocation', views.NumbersLocation.as_view()),
    path('MapCoordinate', views.MapCoordinate.as_view())
]