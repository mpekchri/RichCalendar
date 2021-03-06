from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime
from rest_framework import status
from CalendarBackend.controllers.controllers import BackendMainController
from .models import CalendarStore, MonthCalendarState
from . import serializers
from rest_framework.renderers import JSONRenderer


# Create your views here.
class CurrentDate(APIView):
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        # token = request.auth
        if request.user.is_authenticated:
            return Response({'date':datetime.now().date()},status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class Filters(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        if request.user.is_authenticated:
            parameters = request.query_params
            calendarView = parameters.get('calendarView')
            initialLoad = parameters.get('initialLoad')
            if calendarView == "Month":
                filterObject = request.data
                selectedDate = filterObject.get('selectedDate')
                selectedDate = selectedDate if selectedDate is not None else datetime.now().date()
                tasks = BackendMainController.loadMonthTasks(
                    filters=None,
                    searchText=None,
                    selectedDate=selectedDate,
                    user=request.user
                )
                monthCalendarState = MonthCalendarState(tasks=tasks,selectedDate=selectedDate)
                calendar = CalendarStore(monthCalendarState=monthCalendarState)
                calendarSerializer = serializers.CalendarSerializer(calendar)
                jsonCalendar = JSONRenderer().render(calendarSerializer.data)
                return Response(jsonCalendar,status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_501_NOT_IMPLEMENTED)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)