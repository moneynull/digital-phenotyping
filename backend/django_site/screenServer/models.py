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

    class Meta:
        managed = False
        db_table = 'applications_foreground'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class AwareDevice(models.Model):
    field_id = models.AutoField(db_column='_id', primary_key=True)  # Field renamed because it started with '_'.
    timestamp = models.FloatField(blank=True, null=True)
    device_id = models.CharField(max_length=150, blank=True, null=True)
    board = models.TextField(blank=True, null=True)
    brand = models.TextField(blank=True, null=True)
    device = models.TextField(blank=True, null=True)
    build_id = models.TextField(blank=True, null=True)
    hardware = models.TextField(blank=True, null=True)
    manufacturer = models.TextField(blank=True, null=True)
    model = models.TextField(blank=True, null=True)
    product = models.TextField(blank=True, null=True)
    serial = models.TextField(blank=True, null=True)
    release = models.TextField(blank=True, null=True)
    release_type = models.TextField(blank=True, null=True)
    sdk = models.TextField(blank=True, null=True)
    label = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'aware_device'


class Battery(models.Model):
    field_id = models.AutoField(db_column='_id', primary_key=True)  # Field renamed because it started with '_'.
    timestamp = models.FloatField(blank=True, null=True)
    device_id = models.CharField(max_length=150, blank=True, null=True)
    battery_status = models.IntegerField(blank=True, null=True)
    battery_level = models.IntegerField(blank=True, null=True)
    battery_scale = models.IntegerField(blank=True, null=True)
    battery_voltage = models.IntegerField(blank=True, null=True)
    battery_temperature = models.IntegerField(blank=True, null=True)
    battery_adaptor = models.IntegerField(blank=True, null=True)
    battery_health = models.IntegerField(blank=True, null=True)
    battery_technology = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'battery'


class BatteryCharges(models.Model):
    field_id = models.AutoField(db_column='_id', primary_key=True)  # Field renamed because it started with '_'.
    timestamp = models.FloatField(blank=True, null=True)
    device_id = models.CharField(max_length=150, blank=True, null=True)
    battery_start = models.IntegerField(blank=True, null=True)
    battery_end = models.IntegerField(blank=True, null=True)
    double_end_timestamp = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'battery_charges'


class BatteryDischarges(models.Model):
    field_id = models.AutoField(db_column='_id', primary_key=True)  # Field renamed because it started with '_'.
    timestamp = models.FloatField(blank=True, null=True)
    device_id = models.CharField(max_length=150, blank=True, null=True)
    battery_start = models.IntegerField(blank=True, null=True)
    battery_end = models.IntegerField(blank=True, null=True)
    double_end_timestamp = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'battery_discharges'


class Bluetooth(models.Model):
    field_id = models.AutoField(db_column='_id', primary_key=True)  # Field renamed because it started with '_'.
    timestamp = models.FloatField(blank=True, null=True)
    device_id = models.CharField(max_length=150, blank=True, null=True)
    bt_address = models.CharField(max_length=150, blank=True, null=True)
    bt_name = models.TextField(blank=True, null=True)
    bt_rssi = models.IntegerField(blank=True, null=True)
    label = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'bluetooth'


class Calls(models.Model):
    field_id = models.AutoField(db_column='_id', primary_key=True)  # Field renamed because it started with '_'.
    timestamp = models.FloatField(blank=True, null=True)
    device_id = models.CharField(max_length=150, blank=True, null=True)
    call_type = models.IntegerField(blank=True, null=True)
    call_duration = models.IntegerField(blank=True, null=True)
    trace = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'calls'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


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


class Messages(models.Model):
    field_id = models.AutoField(db_column='_id', primary_key=True)  # Field renamed because it started with '_'.
    timestamp = models.FloatField(blank=True, null=True)
    device_id = models.CharField(max_length=150, blank=True, null=True)
    message_type = models.IntegerField(blank=True, null=True)
    trace = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'messages'


class Screen(models.Model):
    field_id = models.AutoField(db_column='_id', primary_key=True)  # Field renamed because it started with '_'.
    timestamp = models.FloatField(blank=True, null=True)
    device_id = models.CharField(max_length=150, blank=True, null=True)
    screen_status = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'screen'


class SmsSms(models.Model):
    id = models.BigAutoField(primary_key=True)
    sms_id = models.IntegerField()
    device_id = models.CharField(max_length=150)
    message_type = models.IntegerField()
    timestamp = models.IntegerField()
    trace = models.TextField()

    class Meta:
        managed = False
        db_table = 'sms_sms'


class TbAdmin(models.Model):
    uid = models.AutoField(primary_key=True)
    firstname = models.CharField(db_column='firstName', max_length=255, blank=True, null=True)  # Field name made lowercase.
    lastname = models.CharField(db_column='lastName', max_length=255, blank=True, null=True)  # Field name made lowercase.
    password = models.CharField(max_length=255)
    emailadress = models.CharField(db_column='emailAdress', max_length=255)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'tb_admin'


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


class TbClinician(models.Model):
    _id = models.AutoField(primary_key=True)
    firstname = models.CharField(db_column='firstName', max_length=255, blank=True, null=True)  # Field name made lowercase.
    lastname = models.CharField(db_column='lastName', max_length=255, blank=True, null=True)  # Field name made lowercase.
    password = models.CharField(max_length=255)
    emailaddress = models.CharField(db_column='emailAddress', max_length=255)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'tb_clinician'
