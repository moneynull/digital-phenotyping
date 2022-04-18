from rest_framework.views import APIView
from rest_framework.response import Response
from sms.models import Messages

class QuerySMS(APIView):
    @staticmethod
    def get(request):

        req = request.query_params.dict()
        device_id = req["device_id"]

        sms_results = Messages.objects.filter(device_id=device_id).values("field_id","timestamp","device_id","message_type","trace")
        return Response(sms_results)

    
    @staticmethod
    def post(request):
        """
        """
        # req = request.data
        # sms_id = req["sms_id"]
        # device_id = req["device_id"]
        # message_type = req["message_type"]
        
        # SMS(sms_id=sms_id,device_id=device_id,message_type=message_type).save()

        return Response()
