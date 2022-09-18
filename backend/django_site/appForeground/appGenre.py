import pymysql
import DB_connection_details
import json
from google_play_scraper import app as google_app
from google_play_scraper.exceptions import NotFoundError

conn = pymysql.connect(host=DB_connection_details.host,
                       user=DB_connection_details.user,
                       passwd=DB_connection_details.passwd,
                       db=DB_connection_details.db,
                       autocommit=True)

cursor = conn.cursor(pymysql.cursors.DictCursor)
cursor2 = conn.cursor(pymysql.cursors.DictCursor)
cursor3 = conn.cursor(pymysql.cursors.DictCursor)

cursor.execute("SELECT DISTINCT package_name FROM applications_foreground WHERE category IS NULL")
app_records = cursor.fetchall()

for app_record in app_records:
    cursor2.execute("SELECT category FROM applications_foreground WHERE package_name = '" + app_record[
        'package_name'] + "' AND category IS NOT NULL LIMIT 1")
    category_result = cursor2.fetchone()
    category = None
    if category_result:
        category = category_result['category']

if not category:
    try:
        google_info = google_app(app_record['package_name'])  # https://pypi.org/project/google-play-scraper/
        category = google_info['genre']
    except NotFoundError:
        category = "None"

if not category:
    category = "None"

cursor3.execute("UPDATE applications_foreground SET category = '" + category + "' WHERE package_name = '" + app_record[
    'package_name'] + "' AND category IS NULL")