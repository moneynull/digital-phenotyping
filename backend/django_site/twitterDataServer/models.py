from django.db import models

# Create your models here.
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
    last_update = models.DateTimeField()
    twitter_id_int = models.CharField(max_length=45,blank=True, null=True)

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
    
class TwitterHashtag(models.Model):
    field_id = models.AutoField(db_column='_id', primary_key=True)
    twitter_id_int = models.IntegerField(blank=False, null=False)
    hashtag = models.CharField(max_length=45, blank=False, null=False)
    occurrence = models.IntegerField(blank=False, null=False)

    class Meta:
        managed = False
        db_table = 'twitter_hashtag'
