from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework.parsers import JSONParser
import requests
import json

class ProfilesView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        if request.user.is_authenticated:
            user_id = request.user.id
            profiles = Profile.objects.all().filter(user_id=user_id)
            serialized = ProfileSerializer(profiles, many=True)
        else:
            profiles = Profile.objects.filter(id__in=[1, 2])
            serialized = ProfileSerializer(profiles, many=True)
        return Response(data=serialized.data, status=status.HTTP_200_OK)

    def patch(self, request):
        if request.user.is_authenticated:
            data = json.loads(request)
            data = data['body']

            profile = Profile.objects.get(id=data['profileId'])

            if(request.user.id == profile.user.id):
                profile.name = data['name'],
                profile.birthDate = data['birthDate']
                profile.birthTime = data['birthTime']
                profile.birthLocation = data['birthLocation']
                profile.latitude = data['latitude']
                profile.lonitude = data['longitude']
                profile.save()

                return Response(status=status.HTTP_200_OK)

            return Response(status=status.HTTP_400_BAD_REQUEST)


    def post(self, request):
        if request.user.is_authenticated:
            try:
                data = JSONParser().parse(request)
                data = json.loads(data['body'])

                print('Post data: ', data)

                print('user = ', request.user)
                print('name = ', data['name'])
                print('birthDate = ', data['birthDate'])
                print('birthTime = ', data['birthTime'])
                print('birthLocation = ', data['birthLocation'])
                print('longitude = ', data['longitude'])
                print('latitude = ', data['latitude'])

                # serialized = ProfileSerializer(data=data['body'])
                # print(serialized)
                # if serialized.is_valid():
                #     print('\n\nvalid\n\n')
                #     serialized.save()
                #     # return Response(serialized.data)
                # # print('request.user: ', request.user)
                # # print('request.body.name: ', request.body.name)
                new_profile = Profile(
                    user = request.user,
                    name = data['name'],
                    birthDate = data['birthDate'],
                    birthTime = data['birthTime'],
                    birthLocation = data['birthLocation'],
                    latitude = data['latitude'],
                    longitude = data['longitude']
                )
                new_profile.save()
            except Exception as e:
                print(e)
                return Response(status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_200_OK)

class AstroHelper(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        if request.user.is_authenticated:
            data = JSONParser().parse(request)
            data = json.loads(data['body'])
            city = data['city']
            state = data['stateProvince']
            country = data['country']
            city = f'&locality={city}' if city else ''
            ak = 'ApcaXhwxeE_RSaDrryKrzRoUEViV1h-sUcw76TOb0D-FbBNozCcJtsY1DkM2tweX'
            google_geocode = requests.get(f'http://dev.virtualearth.net/REST/v1/Locations?CountryRegion={country}&adminDistrict={state}{city}&maxResults=1&key={ak}')
            google_geocode = google_geocode.json()
            lat_and_long = google_geocode['resourceSets'][0]['resources'][0]['geocodePoints'][0]['coordinates']
            return Response(data=lat_and_long, status=status.HTTP_200_OK)
