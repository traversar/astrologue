from django.urls import path
from .views import ProfilesView

urlpatterns = [
    # add User_id param to profiles/ route
    path('profiles/', ProfilesView.as_view(), name='get_user_profiles'),
]
