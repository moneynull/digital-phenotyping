import unicodedata

from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError
from userServer import models

from django import forms
from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django.utils.translation import gettext_lazy as _


class MyUserChangeForm(UserChangeForm):
    def clean_email(self):
        email = self.cleaned_data['email']
        # exclude the user email itself
        if email and User.objects.filter(email=email).exclude(pk=self.instance.pk).exists():
            raise forms.ValidationError("This email has already used.")
        if email == '' or email is None:
            raise ValidationError("Email cannot be empty.")
        return email


class MyUserCreationForm(UserCreationForm):
    error_messages = {
        "password_mismatch": _("The two password fields didn’t match."),
        "email_used": _("This email has already used."),
        "email_empty": _("Email cannot be empty.")
    }
    email = forms.CharField(
        label=_("Email"),
        strip=False,
        widget=forms.EmailInput(),
        help_text=_("Required. Enter the email"),
    )

    class Meta:
        model = User
        fields = ('username', 'email')  # add email

    def clean_email(self):
        email = self.cleaned_data.get('email')
        # exclude the user email itself
        if email and User.objects.filter(email=email).exclude(pk=self.instance.pk).exists():
            raise ValidationError(
                self.error_messages["email_used"],
                code="email_used",
            )
        return email

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        user.is_staff = True
        if commit:
            user.save()
        return user


class MyUserAdmin(UserAdmin):
    # custom form
    form = MyUserChangeForm
    add_form = MyUserCreationForm

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2')}
         ),
    )

    list_display = ('id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'date_joined')
    ordering = ('id',)


admin.site.unregister(User)
admin.site.register(User, MyUserAdmin)


class ShowClient(admin.ModelAdmin):
    list_display = ('uid', 'clinician_id', 'client_title', 'first_name', 'last_name', 'date_of_birth', 'age',
                    'text_notes', 'status', 'twitter_id', 'facebook_id', 'aware_device_id', 'last_update')

    search_fields = ('uid', 'clinician_id', 'client_title', 'first_name', 'last_name', 'date_of_birth', 'age',
                     'text_notes', 'status', 'twitter_id', 'facebook_id', 'aware_device_id', 'last_update')


admin.site.register(models.TbClient, ShowClient)
