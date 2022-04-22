from django.db import models

class ApplicationsForeground(models.Model):
    field_id = models.AutoField(db_column='_id', primary_key=True)  # Field renamed because it started with '_'.
    timestamp = models.FloatField(blank=True, null=True)
    device_id = models.CharField(max_length=150, blank=True, null=True)
    package_name = models.TextField(blank=True, null=True)
    application_name = models.TextField(blank=True, null=True)
    is_system_app = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'applications_foreground'