# Generated by Django 4.0.3 on 2022-08-20 09:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AuthUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128)),
                ('last_login', models.DateTimeField(blank=True, null=True)),
                ('is_superuser', models.IntegerField()),
                ('username', models.CharField(max_length=150, unique=True)),
                ('first_name', models.CharField(max_length=150)),
                ('last_name', models.CharField(max_length=150)),
                ('email', models.CharField(max_length=254, unique=True)),
                ('is_staff', models.IntegerField()),
                ('is_active', models.IntegerField()),
                ('date_joined', models.DateTimeField()),
            ],
            options={
                'db_table': 'auth_user',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TbClient',
            fields=[
                ('uid', models.IntegerField(primary_key=True, serialize=False)),
                ('clinician_id', models.CharField(max_length=255)),
                ('client_title', models.CharField(blank=True, max_length=255, null=True)),
                ('first_name', models.CharField(blank=True, max_length=255, null=True)),
                ('last_name', models.CharField(blank=True, max_length=255, null=True)),
                ('date_of_birth', models.CharField(blank=True, max_length=255, null=True)),
                ('age', models.IntegerField(blank=True, null=True)),
                ('text_notes', models.TextField(blank=True, null=True)),
                ('status', models.CharField(blank=True, max_length=255, null=True)),
                ('twitter_id', models.CharField(blank=True, max_length=255, null=True)),
                ('facebook_id', models.CharField(blank=True, max_length=255, null=True)),
                ('aware_device_id', models.CharField(blank=True, max_length=255, null=True)),
                ('last_update', models.DateTimeField()),
            ],
            options={
                'db_table': 'tb_client',
                'managed': False,
            },
        ),
    ]
