from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework.parsers import JSONParser

class ProfilesView(APIView):
    def get(self, request):
        if request.user.is_authenticated():
            user_id = request.user.id
            print('user_id ', user_id)
            profiles = Profile.objects.all().filter(user_id=user_id)
            serialized = ProfileSerializer(profiles, many=True)
        return Response(data=serialized.data, status=status.HTTP_200_OK)

    def post(self, request):
        if request.user.is_authenticated():
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
