from django.db import models
from authentication.models import CustomUser

class Profile(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=50)
    birthDate = models.CharField(max_length=40)
    birthTime = models.CharField(max_length=40)
    birthCity = models.CharField(max_length=50)
    birthState = models.CharField(max_length=50)
    birthCountry = models.CharField(max_length=50)
    latitude = models.CharField(max_length=50)
    longitude = models.CharField(max_length=50)
