from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    # owner = serializers.HiddenField(
    #     default=serializers.CurrentUserDefault()
    # )

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
            'birthLocation',
            'latitude',
            'longitude',
        )
        # fields = '__all__'