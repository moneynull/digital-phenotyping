# simple/serializers.py
from . import views
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['username'] = self.user.username

        patient_info = views.extract_patient_info(self.user.username)
        data['patient_info'] = patient_info
        data['patient_count'] = len(patient_info)
        return data
