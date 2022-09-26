# import datetime
# from django.test import TestCase
# from django.urls import reverse

# from locationServer.models import Locations, TbLocCluster
# from locationServer.views import PreProcessLocation

# # Create your tests here.
# class PreProcessLocationTests(TestCase):
#     def get_test_datetime(self):
#         return datetime.datetime(2022,5,22)

#     def setUpTestData():
#         Locations.objects.create(
#             field_id = 1,
#             timestamp = PreProcessLocation.getTimestampFromDate(datetime.datetime(2022,5,22)),
#             device_id = '1',
#             double_latitude = '1',
#             double_longitude = '1'
#         )

#     def test_get(self):
#         pass

#     def test_getUserLatlng(self):
#         device_id = '1'
#         startDate = PreProcessLocation.getTimestampFromDate(datetime.datetime(2022,5,21))
#         endDate = PreProcessLocation.getTimestampFromDate(datetime.datetime(2022,5,23))
#         result_dic = PreProcessLocation.getUserLatlng(device_id, startDate, endDate)
#         loc = Locations.objects.filter(field_id='1').values('double_latitude', 'double_longitude')
#         lat = loc[0]['double_latitude']
#         lng = loc[0]['double_longitude']

#         self.assertEqual({"double_latitude": [lat], "double_longitude": [lng]}, result_dic)

#     def test_initialProcessLocation(self):
#         pass

#     def test_getDatePremeters(self):
#         startDate = PreProcessLocation.getTimestampFromDate(datetime.datetime(2022,5,21))
#         endDate = PreProcessLocation.getTimestampFromDate(datetime.datetime(2022,5,23))
#         start_zero_date, interval, start_zero_timestamp, end_zero_timestamp \
#             = PreProcessLocation.getDatePremeters(startDate, endDate)
#         self.assertEqual(start_zero_date, PreProcessLocation.getDateFromTimestamp(startDate))
#         self.assertEqual(interval, 3)
#         self.assertEqual(start_zero_timestamp, startDate)
#         self.assertEqual(end_zero_timestamp, PreProcessLocation.getTimestampFromDate(PreProcessLocation.getNextDate(datetime.datetime(2022,5,23))))
        
#     def test_getStartAndEndTimestamp(self):
#         timestamp = Locations.objects.filter(field_id=1).values('timestamp')[0]['timestamp']
#         start_timestamp, end_timestamp = PreProcessLocation.getStartAndEndTimestamp('1')
#         self.assertEqual(timestamp, start_timestamp)
#         self.assertEqual(timestamp, end_timestamp)

#     def test_getCheckTime(self):
#         pass
#         # timestamp = Locations.objects.filter(field_id=1)['timestamp']
#         # start_timestamp_list = PreProcessLocation.getCheckTime('1')
#         # self.assertEqual(start_timestamp_list, int(timestamp))


#     def test_getZeroDate(self):
#         date = self.get_test_datetime()
#         zero_date = PreProcessLocation.getZeroDate(date)
#         self.assertEqual(zero_date, date)


#     def test_getTimestampFromDate(self):
#         date = self.get_test_datetime()
#         test_timestamp = PreProcessLocation.getTimestampFromDate(date)
#         self.assertEqual(test_timestamp / 1000, date.timestamp())
    
#     def test_getDateFromTimestamp(self):
#         date = self.get_test_datetime()
#         target_timestamp = date.timestamp()
#         test_date = PreProcessLocation.getDateFromTimestamp(target_timestamp * 1000)
#         self.assertEqual(test_date, date)

#     def test_getFutureDate(self):
#         """
#         getFutureDate() returns value days after input date in datetime.
#         """
#         date = self.get_test_datetime()
#         value = 7
#         new_date = PreProcessLocation.getFutureDate(date, value)
#         self.assertEqual(new_date, datetime.datetime(2022,5,29))

#     def test_getNextDate(self):
#         date = self.get_test_datetime()
#         next = PreProcessLocation.getNextDate(date)

#         self.assertEqual(next, datetime.datetime(2022,5,23))
# class NumbersLocationTests(TestCase):
#     def setUpTestData():
#         TbLocCluster.objects.create(
#             timestamp='1',
#             device_id='2',
#             double_latitude='3',
#             double_longitude='4',
#             address='test street',
#             loc_type='tests'
#         )
    
#     def test_post(self):
#         url = 'http://127.0.0.1:8000/locationServer/NumbersOfLocation'
#         resp = self.client.get(url)

#         # self.assertEqual(resp.status_code, 200)
#         # cluster = TbLocCluster.filter(_id=1)[0]
#         # self.assertIn(cluster['timestamp'], resp.content)
#         # self.assertIn(cluster['device_id'], resp.content)
#         # self.assertIn(cluster['double_latitude'], resp.content)
#         # self.assertIn(cluster['double_longitude'], resp.content)
#         # self.assertIn(cluster['address'], resp.content)
#         # self.assertIn(cluster['loc_type'], resp.content)
#         pass
