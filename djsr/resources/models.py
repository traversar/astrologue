from django.db import models
from authentication.models import CustomUser

class Profile(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    birthDate = models.CharField(max_length=40)
    birthTime = models.CharField(max_length=40)
    birthLocation = models.CharField(max_length=50)
    profile_object = models.TextField()
