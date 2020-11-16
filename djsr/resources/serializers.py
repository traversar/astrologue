from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Profile
        fields = (
            'id',
            'owner',
            'name',
            'birthDate',
            'birthTime',
            'birthLocation',
            'latitude',
            'longitude',
        )
        # fields = '__all__'
