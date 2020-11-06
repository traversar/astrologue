from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        # fields = ('id','user', 'name', 'birthDate', 'birthTime', 'birthLocation', 'person_object', 'chart_object')
        fields = '__all__'
