import time
from http.client import BAD_REQUEST
import json
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from appForeground.models import ApplicationsForeground, TbClient
from appForeground.serializers import appForegroundSerializer


class AppForeground(APIView):

    @staticmethod
    def calculatePercentage(appUsage_d):
        appUsagePER_d = []
        total = 0
        for name, time in appUsage_d.items():
            total += time
            appUsagePER_d[name] = 0

        for name, time in appUsage_d.items():
            appUsagePER_d[name] = round(100 * time / total, 4)

        return appUsagePER_d

    @staticmethod
    def get(self, request, format=None):
        raise Http404

    @staticmethod
    def post(request):

        # TODO delete sample
        # device_id = "0e6b7ce2-633e-476a-9ca3-a19240faeca1"
        # date_from = 1641634738549
        # date_to = 1641675274282

        # find corresponding device id
        if request.method == 'POST':
            uid = json.loads(request.body.decode().replace("'", "\"")).get('uid')
            date_from = json.loads(request.body.decode().replace("'", "\"")).get('startDate')
            date_to = json.loads(request.body.decode().replace("'", "\"")).get('endDate')

        device_id = TbClient.objects.filter(uid=uid).values("awaredeviceid")

        # categorize all app name and map timestamp piece
        appForeground = ApplicationsForeground.objects.all().exclude(timestamp__lte=date_from).exclude(
            timestamp__gte=date_to).filter(device_id__in=device_id).order_by('timestamp')

        # record start time
        timestamp_l = appForeground.values('timestamp')
        app_name_l = appForeground.values('application_name')

        temp_name_l = []
        for q in app_name_l:
            if q['application_name'] != 'System UI':
                temp_name_l.append(q['application_name'])

        # list->set
        app_name_set = set(temp_name_l)
        index_arr = []
        appUsage_arr = []

        for i in range(len(app_name_set)):
            index_arr.append(i)
            appUsage_arr.append(0)

        index_dic = dict((name, value) for name, value in zip(app_name_set, index_arr))
        # sort

        timestamp_string=[]
        for l in timestamp_l:
            timestamp_string.append(l['timestamp'])

        i = 0
        time1 = time.time()
        # we can't know the usage of the last application
        while (i < len(app_name_l) - 1):
            name = app_name_l[i]['application_name']
            if name != 'System UI':
                startTime = timestamp_string[i]
                endTime = timestamp_string[i+1]
            # if name not in appUsage_d:
            #     appUsage_d[name] = 0

                appUsage_arr[index_dic[name]] += (endTime- startTime)
            i += 1

        print(appUsage_arr)
        # appUsagePER_d = AppForeground.calculatePercentage(appUsage_d)

        # conver to list
        usage2d_l = []
        name_l = []
        per_l = []

        # for name, per in appUsagePER_d.items():
        #     name_l.append(name)
        #     per_l.append(per)

        usage2d_l.append(name_l)
        usage2d_l.append(per_l)

        return Response(usage2d_l)
