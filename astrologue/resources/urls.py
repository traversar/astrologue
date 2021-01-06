from django.urls import path
from .views import ProfilesView, AstroHelper

urlpatterns = [
    # add User_id param to profiles/ route
    path('profiles/<int:profile_id>', ProfilesView.as_view(), name='get_user_profiles'),
    path('profiles/', ProfilesView.as_view(), name='get_user_profiles'),
    path('address/', AstroHelper.as_view(), name='get_address_longlat')
]
