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

class CelestialBodies(models.Model):
    name = models.CharField(max_length=50)
    domicile = models.CharField(max_length=20)
    exaltation = models.CharField(max_length=20)
    description = models.TextField()

class ZodiacalSigns(models.Model):
    name = models.CharField(max_length=50)
    mode = models.CharField(max_length=10)
    element = models.CharField(max_length=10)
    ruler = models.CharField(max_length=20)
    summary = models.CharField(max_length=50)
    description = models.TextField()
