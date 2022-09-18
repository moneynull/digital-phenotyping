# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class ApplicationsForeground(models.Model):
    field_id = models.AutoField(db_column='_id', primary_key=True)  # Field renamed because it started with '_'.
    timestamp = models.FloatField(blank=True, null=True)
    device_id = models.CharField(max_length=150, blank=True, null=True)
    package_name = models.TextField(blank=True, null=True)
    application_name = models.TextField(blank=True, null=True)
    is_system_app = models.IntegerField(blank=True, null=True)
    category = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'applications_foreground'

class TbClient(models.Model):
    uid = models.AutoField(primary_key=True)
    clinician_id = models.CharField(max_length=255)
    client_title = models.CharField(max_length=255, blank=True, null=True)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    date_of_birth = models.CharField(max_length=255, blank=True, null=True)
    text_notes = models.TextField(blank=True, null=True)
    twitter_id = models.CharField(max_length=255, blank=True, null=True)
    facebook_id = models.CharField(max_length=255, blank=True, null=True)
    aware_device_id = models.CharField(max_length=255, blank=True, null=True)
    auth_user_id = models.IntegerField()
    last_update = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'tb_client'

class TwitterWordCloud(models.Model):
    field_id = models.AutoField(db_column='_id', primary_key=True)
    twitter_id = models.CharField(max_length=32, blank=False, null=False)
    word = models.CharField(max_length=45, blank=False, null=False)
    occurrence = models.IntegerField(blank=False, null=False)
    
    class Meta:
        managed = False
        db_table = 'twitter_word_cloud'