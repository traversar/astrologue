from rest_framework import serializers
from .models import Profile, ZodiacalSigns, CelestialBodies

class ProfileSerializer(serializers.ModelSerializer):
    # Create a custom method field
    owner = serializers.SerializerMethodField('_user')

    # Use this method for the custom field
    def _user(self, obj):
        request = self.context.get('request', None)
        if request:
            return request.user.username

    class Meta:
        model = Profile
        fields = (
            'id',
            'owner',
            'name',
            'birthDate',
            'birthTime',
            'birthCity',
            'birthState',
            'birthCountry',
            'latitude',
            'longitude',
        )
        # fields = '__all__'

class CelestialBodiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CelestialBodies
        fields = '__all__'

class ZodiacalSignsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ZodiacalSigns
        fields = '__all__'
