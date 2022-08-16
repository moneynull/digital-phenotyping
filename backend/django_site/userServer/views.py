import datetime
import json
import time

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


def response_user_info(username):
    user_result = models.AuthUser.objects.filter(username=username)
    user_info = user_result.values('id', 'username', 'first_name', 'last_name', 'email', 'is_staff')[0]
    return user_info


class ClientInfoList(APIView):
    @staticmethod
    def post(request):
        req = json.loads(request.body.decode().replace("'", "\""))
        clinician_id = req.get('id')
        info_result = models.TbClient.objects.filter(clinician_id=clinician_id)
        client_info = info_result.values('uid', 'client_title', 'aware_device_id', 'last_update')

        return Response(client_info.values())


class ClientProfile(APIView):
    @staticmethod
    def post(request):
        req = json.loads(request.body.decode().replace("'", "\""))
        # TODO:uid or auth_user_id?
        uid = req.get('uid')

        client_result = models.TbClient.objects.filter(uid=uid)
        return Response(client_result.values()[0])


def get_client_form(req):
    client_form = {
        'clinician_id': req.get('clinicianId'),
        'client_title': req.get('clientTitle'),
        'first_name': req.get('firstName'),
        'last_name': req.get('lastName'),
        'date_of_birth': req.get('dateOfBirth'),
        'text_notes': req.get('textNotes'),
        'twitter_id': req.get('twitterId'),
        'facebook_id': req.get('facebookId'),
        'aware_device_id': req.get('awareDeviceId'),
    }
    return client_form


class UpdateClientProfile(APIView):
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
        username = add_form.get('first_name') + add_form.get('last_name')
        # TODO: age + uid/auth_user_id?
        num_uname = models.AuthUser.objects.filter(username__icontains=username).count()
        if num_uname != 0:
            username = username + str(num_uname)
        auth_form = {
            'password': 'P@ssword2',
            'is_superuser': 0,
            'username': username,
            'email': username + '@',
            'first_name': add_form.get('first_name'),
            'last_name': add_form.get('last_name'),
            'is_staff': 0,
            'is_active': 1,
            # 'date_joined': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        auth_client = models.AuthUser.objects.create(**auth_form)

        models.TbClient.objects.create(**add_form, auth_user_id=auth_client.id)
        return Response(200)


class DeleteClient(APIView):
    @staticmethod
    def post(request):
        req = json.loads(request.body.decode().replace("'", "\""))
        uid = req.get('uid')
        models.TbClient.objects.filter(uid=uid).delete()
        return Response(200)
