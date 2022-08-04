from django.core.management.base import BaseCommand, CommandError

from google_play_scraper import app as google_app  # https://pypi.org/project/google-play-scraper/
import json

from django_site.appForeground.models import ApplicationsForeground


#
# with connection.cursor() as cursor:
#     cursor.execute("SELECT * FROM applications_foreground WHERE application_category IS NULL")
#     results = dictfetchall(cursor)
#     for result in results:
#         try:
#             google_info = google_app(
#                 result['package_name'])  # https://pypi.org/project/google-play-scraper/
#             if google_info['genre']:
#         # update application_category cell for this record
#         except:
#             pass
#
# def dictfetchall(cursor):
#     # Return all rows from a cursor as a dict
#     columns = [col[0] for col in cursor.description]
#     return [
#         dict(zip(columns, row))
#         for row in cursor.fetchall()
#     ]

def updateGenre():
    genre_result = ApplicationsForeground.objects.filter(application_category__isnull=True)
    for r in genre_result:
        try:
            google_info = google_app(
                r['package_name'])  # https://pypi.org/project/google-play-scraper/
            if google_info['genre']:
                # update application_category cell for this record
                r.application_category = google_info['genre']
        except:
            pass
    genre_result.objects.bulk_update(genre_result, update_fields=['application_category'])



