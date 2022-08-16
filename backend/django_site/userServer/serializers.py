# simple/serializers.py
from . import views
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        # data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        user_info = views.response_user_info(self.user.username)
        data['user_info'] = user_info
        return data
