from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework.parsers import JSONParser
import requests

class ProfilesView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            user_id = request.user.id
            print('user_id ', user_id)
            profiles = Profile.objects.all().filter(user_id=user_id)
            serialized = ProfileSerializer(profiles, many=True)
        return Response(data=serialized.data, status=status.HTTP_200_OK)

    def post(self, request):
        if request.user.is_authenticated:
            try:
                data = JSONParser().parse(request)
                print('Post data: ', data)

                serialized = ProfileSerializer(data=data)
                if serialized.is_valid():
                    serialized.save()
                    return Response(serialized.data)

                # print('request.user: ', request.user)
                # print('request.body.name: ', request.body.name)
                # new_profile = Profile(
                #     user = request.user,
                #     name = request.body.name,
                #     birthDate = request.body.birthData,
                #     birthTime = request.body.birthTime,
                #     person_object = request.body.person_object,
                #     chart_object = request.body.chart_object,
                # )
                # new_profile.save()
            except Exception:
                return Response(status=status.HTTP_400_BAD_REQUEST)

class AstroHelper(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        if request.user.is_authenticated:
            data = JSONParser().parse(request)
            print(data)
            address = data['body'].split(' ')
            address = '+'.join(address)
            print(address)
            ak = 'ApcaXhwxeE_RSaDrryKrzRoUEViV1h-sUcw76TOb0D-FbBNozCcJtsY1DkM2tweX'
            google_geocode = requests.get(f'http://dev.virtualearth.net/REST/v1/Locations?&addressLine={address}&maxResults={1}&key={ak}')
            print(google_geocode)
            print(JSONParser().parse(google_geocode))
            return Response(data=google_geocode, status=status.HTTP_200_OK)
