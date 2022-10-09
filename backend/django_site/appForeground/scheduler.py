
import environ
from google_play_scraper.exceptions import NotFoundError
from google_play_scraper import app as google_app

# use this to run crontasks under the background
from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore, register_events, register_job
from appForeground.models import ApplicationsForeground

try:
    env = environ.Env()
    scheduler = BackgroundScheduler()
    scheduler.add_jobstore(DjangoJobStore(), "default")

    @register_job(scheduler, "interval", hours=env('CATEGORY_SCHEDULE'))
    def test_job():
        appCategory()

    register_events(scheduler)
    scheduler.start()

except Exception as e:
    print('Scrape Category CronTask Exception：%s' % str(e))


def appCategory():
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