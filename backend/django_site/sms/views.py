from rest_framework.views import APIView
from rest_framework.response import Response
from sms.models import Messages
from sms.models import TbClient
import datetime
import time

class QuerySMS(APIView):
    @staticmethod
    def get(request):

        req = request.query_params.dict()
        uid = req["uid"]
        device_result = TbClient.objects.filter(uid=uid).values("awaredeviceid")
        device_id = device_result[0]["awaredeviceid"]

        today_timestamp = "1646898913000"
        today = datetime.datetime.fromtimestamp(int(today_timestamp)/1000)

        # today = datetime.datetime.now()

        zero_today = today - datetime.timedelta(hours=today.hour, minutes=today.minute, seconds=today.second,microseconds=today.microsecond)
        
        start_date = zero_today - datetime.timedelta(days=20)
        end_date = zero_today

        date_interval = end_date - start_date

        start_date_timestamp = int(time.mktime(start_date.timetuple() )* 1000)
        end_date_timestamp = int(time.mktime(end_date.timetuple() )* 1000)

        sms_results = Messages.objects.filter(device_id=device_id)\
            .exclude(timestamp__gte = end_date_timestamp)\
                .filter(timestamp__gte = start_date_timestamp)\
                    .values("field_id","timestamp","device_id","message_type","trace")

        # initial list
        result_array = [[] for i in range(3)]
        date_array = []
        for i in range(date_interval.days):
            result_array[0].append(0)
        for i in range(date_interval.days):
            result_array[1].append(0)
        for i in range(date_interval.days):
            result_array[2].append((start_date + datetime.timedelta(days=i)).date().strftime('%d/%m/%Y'))
            date_array.append(start_date + datetime.timedelta(days=i))

        i = 0
        j = 0

        start_date_end_timestamp = int(time.mktime((start_date + datetime.timedelta(days=1)).timetuple() )* 1000)

        for r in sms_results:
            
            while start_date_timestamp > r["timestamp"] or r["timestamp"] >= start_date_end_timestamp:
                
                j += 1
                start_date_timestamp = int(time.mktime(date_array[j].timetuple()) * 1000)
                start_date_end_timestamp = int(time.mktime((date_array[j] + datetime.timedelta(days=1)).timetuple()) * 1000)
                
                if j > date_interval.days:
                    break
                
            if j >= date_interval.days:
                    break
            result_array[r["message_type"] - 1][j] = result_array[r["message_type"] - 1][j] + 1

        print(result_array)

        return Response(result_array)

    
    @staticmethod
    def post(request):
        """
        """

        return Response()
