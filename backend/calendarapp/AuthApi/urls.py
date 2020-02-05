from django.urls import path
from . import views


app_name = 'AuthApi'


urlpatterns = [
    path("auth-api/login/", views.Login.as_view(), name='login'),
    # path("auth-api/logout/", views.Logout.as_view(), name='logout'),
    # path("auth-api/register/", views.Register.as_view(), name='register'),
]
