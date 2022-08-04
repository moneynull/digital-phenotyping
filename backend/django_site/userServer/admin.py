from django.contrib import admin

# Register your models here.
from django.contrib import admin
from userServer import models

from django import forms
from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm


class CusUserChangeForm(UserChangeForm):
    def clean_email(self):
        email = self.cleaned_data['email']
        # 注意用exclude排除自身
        if email and User.objects.filter(email=email).exclude(pk=self.instance.pk).exists():
            raise forms.ValidationError("This email already used")
        return email


class CusUserAdmin(UserAdmin):
    # custom form
    form = CusUserChangeForm

    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'date_joined')
    ordering = ('-date_joined',)


admin.site.unregister(User)
admin.site.register(User, CusUserAdmin)


class ShowClient(admin.ModelAdmin):
    list_display = ('uid', 'clinicianid', 'clienttitle')
    search_fields = ('uid', 'clinicianid', 'clienttitle')


admin.site.register(models.TbClient, ShowClient)
