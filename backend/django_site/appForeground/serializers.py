from rest_framework import serializers
from appForeground.models import ApplicationsForeground

class appForegroundSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationsForeground
        fields = ['field_id', 'timestamp', 'device_id', 'application_name', 'package_name', 'is_system_app']