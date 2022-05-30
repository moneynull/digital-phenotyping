from django.test import TestCase

from locationServer.models import TbClient

class TbClientModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        TbClient.objects.create(
            uid=1, 
            clinicianid='2', 
            password='passord'
        )

    # ------------ test label ----------- #

    # ------------ test max length ----------- #
    def test_clinician_id_max_length(self):
        client = TbClient.objects.get(uid=1)
        max_length = client._meta.get_field('clinicianid').max_length
        self.assertEqual(max_length, 255)

    def test_client_title_max_length(self):
        client = TbClient.objects.get(uid=1)
        max_length = client._meta.get_field('clienttitle').max_length
        self.assertEqual(max_length, 255)

    def test_first_name_max_length(self):
        client = TbClient.objects.get(uid=1)
        max_length = client._meta.get_field('firstname').max_length
        self.assertEqual(max_length, 255)

    def test_last_name_max_length(self):
        client = TbClient.objects.get(uid=1)
        max_length = client._meta.get_field('lastname').max_length
        self.assertEqual(max_length, 255)

    def test_date_of_birth_max_length(self):
        client = TbClient.objects.get(uid=1)
        max_length = client._meta.get_field('dateofbirth').max_length
        self.assertEqual(max_length, 255)

    def test_twitter_id_max_length(self):
        client = TbClient.objects.get(uid=1)
        max_length = client._meta.get_field('twitterid').max_length
        self.assertEqual(max_length, 255)

    def test_facebook_id_max_length(self):
        client = TbClient.objects.get(uid=1)
        max_length = client._meta.get_field('facebookid').max_length
        self.assertEqual(max_length, 255)

    def test_aware_device_id_max_length(self):
        client = TbClient.objects.get(uid=1)
        max_length = client._meta.get_field('awaredeviceid').max_length
        self.assertEqual(max_length, 255)

    def test_password_max_length(self):
        client = TbClient.objects.get(uid=1)
        max_length = client._meta.get_field('password').max_length
        self.assertEqual(max_length, 255)

    def test_email_address_max_length(self):
        client = TbClient.objects.get(uid=1)
        max_length = client._meta.get_field('emailaddress').max_length
        self.assertEqual(max_length, 255)

    # ------------ test model func ----------- #