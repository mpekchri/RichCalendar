from rest_framework.test import APITestCase, APIClient
from rest_framework.reverse import reverse as api_reverse
from rest_framework import status
from CalendarBackend import models
from datetime import datetime


# Use this module in order to test Api
class CalendarApiTestCase(APITestCase):
    def setUp(self):
        # Initial state goes here
        user = models.User(name="dummyAdmin")
        user.set_password('1QJhbiLQiLC1QiJhbGci')
        user.save()
        domainModel = models.DomainModel()
        state = models.State()
        state.save()
        domainModel.currentState = state
        state.users.add(user)
        task = models.Task(
                name="Build a wall",
                fromDate=datetime.now().replace(day=2),
                toDate=datetime.now().replace(day=8),
                visibility="OT",
                status="P",
                priority="HST",          
        )
        task.save()
        state.tasks.add(task)
        task = models.Task(
                name="Find a way to pay the wall",
                fromDate=datetime.now().replace(day=4),
                toDate=datetime.now().replace(day=5),
                visibility="OT",
                status="P",
                priority="M",
                createdBy=user                
        )
        task.save()
        state.tasks.add(task)
        task = models.Task(
                name="Wall is cool",
                fromDate=datetime.now().replace(day=6),
                toDate=datetime.now().replace(day=10),
                visibility="OT",
                status="P",
                priority="M",
                createdBy=user                
        )
        task.save()
        state.tasks.add(task)
        task = models.Task(
                name="Build another ?",
                fromDate=datetime.now().replace(day=6),
                toDate=datetime.now().replace(day=10),
                visibility="OT",
                status="P",
                priority="H",
                createdBy=user              
        )
        task.save()
        state.tasks.add(task)
        # Finally :
        domainModel.save()


    def test_MonthCalendar_noFilters_noSearchText_noSelectedDate(self):
        url = api_reverse("AuthApi:login")
        data = {
            "username":"dummyAdmin",
            "password":"1QJhbiLQiLC1QiJhbGci"
        }
        response = self.client.post(url, data, format='json')
        token = response.data['token']
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # filter post
        url = api_reverse("CalendarApi:filters")
        # data = {
        #     "initialLoad":False,
        #     "calendarView":"Month"
        # }
        headers = {'Authorization': 'Token '+token}
        # params = {"initialLoad":False,"calendarView":"Month"}
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        response = self.client.post(url, {}, format='json', **{'QUERY_STRING': 'initialLoad=false&calendarView=Month'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print(response.data)
