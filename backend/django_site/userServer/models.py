# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
import datetime

from django.db import models


class TbClient(models.Model):
    uid = models.IntegerField(primary_key=True)
    clinician_id = models.CharField(max_length=255)
    client_title = models.CharField(max_length=255, blank=True, null=True)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    date_of_birth = models.CharField(max_length=255, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    text_notes = models.TextField(blank=True, null=True)
    status = models.CharField(default='Normal', max_length=255, blank=True, null=True)
    twitter_id = models.CharField(max_length=255, blank=True, null=True)
    facebook_id = models.CharField(max_length=255, blank=True, null=True)
    aware_device_id = models.CharField(max_length=255, blank=True, null=True)
    last_update = models.DateTimeField(default=datetime.datetime.now())

    class Meta:
        managed = False
        db_table = 'tb_client'


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(unique=True, max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField(default=datetime.datetime.now())

    class Meta:
        managed = False
        db_table = 'auth_user'
