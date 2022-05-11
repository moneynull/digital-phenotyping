from django.db import models


class Messages(models.Model):
    field_id = models.AutoField(db_column='_id', primary_key=True)  # Field renamed because it started with '_'.
    timestamp = models.FloatField(blank=True, null=True)
    device_id = models.CharField(max_length=150, blank=True, null=True)
    message_type = models.IntegerField(blank=True, null=True)
    trace = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'messages'

class TbClient(models.Model):
    uid = models.AutoField(primary_key=True)
    clinicianid = models.CharField(db_column='clinicianId', max_length=255)  # Field name made lowercase.
    clienttitle = models.CharField(db_column='clientTitle', max_length=255, blank=True, null=True)  # Field name made lowercase.
    firstname = models.CharField(db_column='firstName', max_length=255, blank=True, null=True)  # Field name made lowercase.
    lastname = models.CharField(db_column='lastName', max_length=255, blank=True, null=True)  # Field name made lowercase.
    dateofbirth = models.CharField(db_column='dateOfBirth', max_length=255, blank=True, null=True)  # Field name made lowercase.
    textnotes = models.TextField(db_column='textNotes', blank=True, null=True)  # Field name made lowercase.
    twitterid = models.CharField(db_column='twitterId', max_length=255, blank=True, null=True)  # Field name made lowercase.
    facebookid = models.CharField(db_column='facebookId', max_length=255, blank=True, null=True)  # Field name made lowercase.
    awaredeviceid = models.CharField(db_column='awareDeviceId', max_length=255, blank=True, null=True)  # Field name made lowercase.
    password = models.CharField(max_length=255)
    emailaddress = models.CharField(db_column='emailAddress', max_length=255)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'tb_client'

class Locations(models.Model):
    field_id = models.AutoField(db_column='_id', primary_key=True)  # Field renamed because it started with '_'.
    timestamp = models.FloatField(blank=True, null=True)
    device_id = models.CharField(max_length=150, blank=True, null=True)
    double_latitude = models.FloatField(blank=True, null=True)
    double_longitude = models.FloatField(blank=True, null=True)
    double_bearing = models.FloatField(blank=True, null=True)
    double_speed = models.FloatField(blank=True, null=True)
    double_altitude = models.FloatField(blank=True, null=True)
    provider = models.TextField(blank=True, null=True)
    accuracy = models.FloatField(blank=True, null=True)
    label = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'locations'