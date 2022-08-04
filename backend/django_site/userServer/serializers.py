# simple/serializers.py
from . import views
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        # data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        clinician_info = views.response_clinician_info(self.user.username)
        data['clinician_info'] = clinician_info
        return data
