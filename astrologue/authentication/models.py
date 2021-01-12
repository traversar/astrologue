from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    default_profile = models.CharField(max_length=120, blank=True)
