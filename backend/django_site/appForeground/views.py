from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from appForeground.models import ApplicationsForeground
from appForeground.serializers import appForegroundSerializer


class AppForeground(APIView):
    
    def get(self, request, format=None):

        #req = request.query_params.dict()
        device_id = "0e6b7ce2-633e-476a-9ca3-a19240faeca1"

        appForeground = ApplicationsForeground.objects.all().filter(device_id=device_id)
        serializer = appForegroundSerializer(appForeground, many=True)
        #result = ApplicationsForeground.objects.filter(device_id=device_id).values("field_id","timestamp","device_id","package_name", "application_name","is_system_app")

        return Response(serializer.data)
    
    def post(self, request, format=None):
        raise Http404
