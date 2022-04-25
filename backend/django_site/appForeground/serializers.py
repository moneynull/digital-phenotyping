from rest_framework import serializers
from appForeground.models import ApplicationsForeground, TbClient

class appForegroundSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationsForeground
        fields = ['field_id', 'timestamp', 'device_id', 'application_name', 'package_name', 'is_system_app']

class clientSerializer(serializers.ModelSerializer):
    class Meta:
        model = TbClient
        fields = ['uid', 'clinicianId', 'clientTitle', 'firstName', 'lastName', 'dateOfBirth', 'textNotes', 'twitterId', 'facebookId', 'awareDeviceId', 'password', 'emailAddress']
