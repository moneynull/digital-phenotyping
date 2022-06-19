from django.urls import path
from . import views

urlpatterns = [
    path('PatientProfile', views.PatientProfile.as_view()),
    path('ChangeProfile', views.ChangeProfile.as_view()),
    path('AddPatient', views.AddPatient.as_view()),
    path('DeletePatient', views.DeletePatient.as_view()),
]
