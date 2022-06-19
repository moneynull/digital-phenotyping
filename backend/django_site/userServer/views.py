import json

from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.views import APIView
from userServer import models
from rest_framework_simplejwt.views import TokenObtainPairView
from userServer.serializers import MyTokenObtainPairSerializer

from django.contrib.auth import get_user_model, authenticate, login
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class CusModelBackend(ModelBackend):
    """
    Authenticates against settings.AUTH_USER_MODEL.
    """

    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = get_user_model().objects.get(Q(username=username) | Q(email=username))
            if user.check_password(password):  # and self.user_can_authenticate(user):
                return user
        except Exception as e:  # catch exception
            return None


def extract_patient_info(username):
    clinician_id = models.AuthUser.objects.filter(username=username).values("id")[0]["id"]
    info_result = models.TbClient.objects.filter(clinicianid=clinician_id)
    patient_info = info_result.values('uid', 'clienttitle', 'awaredeviceid')

    return patient_info


class PatientProfile(APIView):
    @staticmethod
    def post(request):
        req = json.loads(request.body.decode().replace("'", "\""))
        uid = req.get('uid')

        profile_result = models.TbClient.objects.filter(uid=uid)
        return Response(profile_result.values()[0])


class ChangeProfile(APIView):
    @staticmethod
    def post(request):
        return Response(200)


class AddPatient(APIView):
    @staticmethod
    def post(request):
        return Response(200)


class DeletePatient(APIView):
    @staticmethod
    def post(request):
        return Response(200)
