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


def response_client_info(username):
    clinician_id = models.AuthUser.objects.filter(username=username).values("id")[0]["id"]
    info_result = models.TbClient.objects.filter(clinicianid=clinician_id)
    client_info = info_result.values('uid', 'clienttitle', 'awaredeviceid')

    return client_info


class ClientProfile(APIView):
    @staticmethod
    def post(request):
        req = json.loads(request.body.decode().replace("'", "\""))
        uid = req.get('uid')

        client_result = models.TbClient.objects.filter(uid=uid)
        return Response(client_result.values()[0])


def get_client_form(req):
    client_form = {
        'clinicianid': req.get('clinicianId'),
        'clienttitle': req.get('clientTitle'),
        'firstname': req.get('firstName'),
        'lastname': req.get('lastName'),
        'dateofbirth': req.get('dateOfBirth'),
        'textnotes': req.get('textNotes'),
        'twitterid': req.get('twitterId'),
        'facebookid': req.get('facebookId'),
        'awaredeviceid': req.get('awareDeviceId')
    }
    return client_form


class ChangeProfile(APIView):
    @staticmethod
    def post(request):
        req = json.loads(request.body.decode().replace("'", "\""))
        uid = req.get('uid')
        change_form = get_client_form(req)
        models.TbClient.objects.filter(uid=uid).update(**change_form)
        return Response(200)


class AddClient(APIView):
    @staticmethod
    def post(request):
        req = json.loads(request.body.decode().replace("'", "\""))
        add_form = get_client_form(req)
        models.TbClient.objects.create(**add_form)
        return Response(200)


class DeleteClient(APIView):
    @staticmethod
    def post(request):
        req = json.loads(request.body.decode().replace("'", "\""))
        uid = req.get('uid')
        models.TbClient.objects.filter(uid=uid).delete()
        return Response(200)
