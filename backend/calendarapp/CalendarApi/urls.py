from django.urls import path
from . import views


app_name = 'CalendarApi'


urlpatterns = [
    path("calendar-api/current-date", views.CurrentDate.as_view(), name='get-current-date'),
    path('calendar-api/filters', views.Filters.as_view(), name='filters'),
]
