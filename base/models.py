from django.db import models
from django.db.models.fields import IntegerField
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, User
import datetime
from datetime import date

# Create your models here.

class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, user_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, user_name, password, **other_fields)

    def create_user(self, email, user_name, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name,
                           **other_fields)
        user.set_password(password)
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(_('email address'), unique=True)
    user_name = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    start_date = models.DateTimeField(default=timezone.now)
    about = models.TextField(_(
        'about'), max_length=500, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    paid_until = models.DateField(
        null=True,
        blank=True
    )
    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name']
    def set_paid_until(self, date_or_timestamp):
      if isinstance(date_or_timestamp, int):
        # input date as timestamp integer
        paid_until = date.fromtimestamp(date_or_timestamp)
      elif isinstance(date_or_timestamp, str):
        # input date as timestamp string
        paid_until = date.fromtimestamp(int(date_or_timestamp))
      else:
        paid_until = date_or_timestamp

      self.paid_until = paid_until
      self.save()
    def is_premium(self, current_date=datetime.date.today()):
      if self.paid_until is None:
        return False

      return current_date < self.paid_until

    def __str__(self):
      return self.user_name
