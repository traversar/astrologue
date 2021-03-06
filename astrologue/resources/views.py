from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Profile, CelestialBodies, ZodiacalSigns
from .serializers import ProfileSerializer, CelestialBodiesSerializer, ZodiacalSignsSerializer
from rest_framework.parsers import JSONParser
import requests
import json

class ProfilesView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        if request.user.is_authenticated:
            print("authenticated: ", request.user)
            user_id = request.user.id
            profiles = Profile.objects.all().filter(user_id=user_id)
            serialized = ProfileSerializer(profiles, context={'request': request}, many=True)
            serialized.data.append({'user': request.user})
            print(serialized.data)
        else:
            print("not authenticated", request.user)
            profiles = Profile.objects.filter(id__in=[1, 2, 3, 4, 5, 6, 7, 8])
            serialized = ProfileSerializer(profiles, many=True)
        return Response(data=serialized.data, status=status.HTTP_200_OK)

    def patch(self, request):
        if request.user.is_authenticated:
            data = JSONParser().parse(request)
            data = json.loads(data['body'])
            profile = Profile.objects.get(id=data['profileId'])
            if(request.user.id == profile.user.id):
                profile.name = data['name']
                profile.birthDate = data['birthDate']
                profile.birthTime = data['birthTime']
                profile.birthCity = data['birthCity']
                profile.birthState = data['birthState']
                profile.birthCountry = data['birthCountry']
                profile.latitude = data['latitude']
                profile.lonitude = data['longitude']
                profile.save()

                return Response(status=status.HTTP_200_OK)

            print(5)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        if request.user.is_authenticated:
            try:
                data = JSONParser().parse(request)
                data = json.loads(data['body'])

                new_profile = Profile(
                    user = request.user,
                    name = data['name'],
                    birthDate = data['birthDate'],
                    birthTime = data['birthTime'],
                    birthCity = data['birthCity'],
                    birthState = data['birthState'],
                    birthCountry = data['birthCountry'],
                    latitude = data['latitude'],
                    longitude = data['longitude']
                )
                new_profile.save()
            except Exception as e:
                print(e)
                return Response(status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_200_OK)

    def delete(self, request, profile_id):
        if request.user.is_authenticated:
            try:
                profile = Profile.objects.get(id=profile_id)
                profile.delete()
                return Response(status.HTTP_200_OK)
            except Exception as e:
                print(e)
                return Response(status=status.HTTP_400_BAD_REQUEST)


class AstroHelper(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
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


class AstroDetails(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        # data = JSONParser().parse(request)
        # data = json.loads(data['body'])
        zodiacal_signs = ZodiacalSigns.objects.all()
        celestial_bodies = CelestialBodies.objects.all()
        data = {
            "signs": ZodiacalSignsSerializer(zodiacal_signs, many=True).data,
            "bodies": CelestialBodiesSerializer(celestial_bodies, many=True).data
        }
        return Response(data=data, status=status.HTTP_200_OK)
