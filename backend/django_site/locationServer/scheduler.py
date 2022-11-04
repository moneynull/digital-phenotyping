#
# import environ
#
# # use this to run crontasks under the background
# from apscheduler.schedulers.background import BackgroundScheduler
# from django_apscheduler.jobstores import DjangoJobStore, register_events, register_job
# from locationServer.views import PreProcessLocation
#
# try:
#     env = environ.Env()
#     scheduler = BackgroundScheduler()
#     scheduler.add_jobstore(DjangoJobStore(), "default")
#
#     @register_job(scheduler, "interval", hours=env('LOCATION_SCHEDULE'))
#     def test_job():
#         PreProcessLocation.initialProcessLocation()
#
#     register_events(scheduler)
#     scheduler.start()
#
# except Exception as e:
#     print('Location Service CronTask Exception：%s' % str(e))