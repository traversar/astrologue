from django.urls import path
from .views import ProfilesView, AstroHelper, AstroDetails

urlpatterns = [
    # add User_id param to profiles/ route
    path('profiles/<int:profile_id>', ProfilesView.as_view(), name='get_user_profile'),
    path('profiles/', ProfilesView.as_view(), name='get_user_profiles'),
    path('address/', AstroHelper.as_view(), name='get_address_longlat'),
    path('astro/', AstroDetails.as_view(), name='get_astro_details')
]
