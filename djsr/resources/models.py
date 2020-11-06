from django.db import models
from authentication.models import CustomUser

class Profile(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    birthDate = models.CharField(max_length=40)
    birthTime = models.CharField(max_length=40)
    birthLocation = models.CharField(max_length=50)
    person_object = models.CharField(max_length=200)
    chart_object = models.CharField(max_length=200)
