import time
from http.client import BAD_REQUEST
import json

from django.db.models import Count
from django.http import Http404
from google_play_scraper.exceptions import NotFoundError
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from appForeground.models import ApplicationsForeground, TbClient
from google_play_scraper import app as google_app


class AppForeground(APIView):

    @staticmethod
    def calculatePercentage(array):
        per_arr = []
        total = 0
        for value in array:
            total += value
            per_arr.append(0)

        for i in range(0, len(per_arr)):
            per_arr[i] = round(100 * array[i] / total, 4)

        return per_arr

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
        req = json.loads(request.body.decode().replace("'", "\""))
        uid = req.get('uid')
        date_from = req.get('startDate')
        date_to = req.get('endDate')

        device_id = TbClient.objects.filter(uid=uid).values("aware_device_id")

        # categorize all app name and map timestamp piece
        appForeground = ApplicationsForeground.objects.all().exclude(timestamp__lte=date_from).exclude(
            timestamp__gte=date_to).filter(device_id__in=device_id).order_by('timestamp')

        # record start time
        timestamp_l = appForeground.values('timestamp')
        app_name_l = appForeground.values('application_name')

        # convert app name from [dict] to set
        temp_name_l = []
        for q in app_name_l:
            if q['application_name'] != 'System UI':
                temp_name_l.append(q['application_name'])

        app_name_set = set(temp_name_l)

        # index and usage of applications
        index_arr = []
        appTime_arr = []

        # distinct index, usage initialization
        for i in range(0, len(app_name_set)):
            index_arr.append(i)
            appTime_arr.append(0)

        # store the app name and its index mapping in a dict 
        index_dic = dict((name, index) for name, index in zip(app_name_set, index_arr))

        # convert app timestamp from [dict] to []
        timestamp_string = []
        for l in timestamp_l:
            timestamp_string.append(l['timestamp'])

        i = 0
        # we can't know the usage of the last application
        # iterate on all records 
        while (i < len(app_name_l) - 1):
            name = app_name_l[i]['application_name']
            if name != 'System UI':
                startTime = timestamp_string[i]
                endTime = timestamp_string[i + 1]
                appTime_arr[index_dic[name]] += (endTime - startTime)
            i += 1

        appUsage_arr = AppForeground.calculatePercentage(appTime_arr)

        # conver app name and usage to a 2d array to return
        usage2d_arr = []
        name_arr = []
        per_arr = []

        for name, index in index_dic.items():
            name_arr.append(name)
            per_arr.append(appUsage_arr[index])

        usage2d_arr.append(name_arr)
        usage2d_arr.append(per_arr)

        return Response(usage2d_arr)


class AppCategory(APIView):
    @staticmethod
    def post(request):
        req = json.loads(request.body.decode().replace("'", "\""))
        uid = req.get('uid')
        start_date = req.get('startDate')
        end_date = req.get('endDate')

        device_id = TbClient.objects.filter(uid=uid).values("aware_device_id")

        category_result = ApplicationsForeground.objects.all(). \
            filter(device_id__in=device_id, timestamp__gte=start_date, timestamp__lte=end_date) \
            .values_list("category").annotate(ccount=Count(1))

        c_dict = dict(list(category_result))

        res_dic = {
            "category": c_dict.keys(),
            "count": c_dict.values()
        }

        return Response(res_dic)


class ScrapeAppCategory(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def get(request):
        # dic not null->update null
        exists_result = ApplicationsForeground.objects.filter(category__isnull=False)
        exists_dic = dict(list(exists_result.values_list("package_name", "category").distinct()))
        empty_result = ApplicationsForeground.objects.filter(category__isnull=True)
        for empty in empty_result:
            if empty.package_name in exists_dic.keys():
                empty.category = exists_dic[empty.package_name]

        ApplicationsForeground.objects.bulk_update(empty_result, fields=['category'])

        # scrape google->update null
        update_result = ApplicationsForeground.objects.filter(category__isnull=True)
        update_dic = dict(list(update_result.values_list("package_name", "category").distinct()))

        for r in update_result.values("package_name", "category").distinct():
            try:
                google_info = google_app(r['package_name'])
                update_dic[r['package_name']] = google_info['genre']
            except NotFoundError:
                r['category'] = "None"

        for update in update_result:
            if update.package_name in update_dic.keys():
                update.category = update_dic[update.package_name]

        ApplicationsForeground.objects.bulk_update(update_result, fields=['category'])
        return Response(200)
