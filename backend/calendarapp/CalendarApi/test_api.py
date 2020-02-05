from rest_framework.test import APITestCase
from rest_framework.reverse import reverse as api_reverse
from rest_framework import status
from CalendarBackend import models


# Use this module in order to test Api
class CalendarApiTestCase(APITestCase):
    def setUp(self):
        # Initial state goes here
        user = models.User(name="geparxos")
        user.set_password('1230852456')
        user.save()
        domainModel = models.DomainModel()
        state = models.State()
        state.users.extend([user])
        state.tasks.extend([
            models.Task(
                name="Build a wall",
                fromDate=datetime.now().replace(day=2),
                toDate=datetime.now().replace(day=8),
                visibility="OT",
                status="P",
                priority="HST",
                createdBy=user                
            ),
            models.Task(
                name="Find a way to pay the wall",
                fromDate=datetime.now().replace(day=4),
                toDate=datetime.now().replace(day=5),
                visibility="OT",
                status="P",
                priority="M",
                createdBy=user                
            ),  
            models.Task(
                name="Wall is cool",
                fromDate=datetime.now().replace(day=6),
                toDate=datetime.now().replace(day=10),
                visibility="OT",
                status="P",
                priority="M",
                createdBy=user                
            ),
            models.Task(
                name="Build another ?",
                fromDate=datetime.now().replace(day=6),
                toDate=datetime.now().replace(day=10),
                visibility="OT",
                status="P",
                priority="H",
                createdBy=user                
            ),         
        ])
        domainModel.currentState = state
        # Finally :
        state.save()
        domainModel.save()


    def test_testName(self):
        # Any test goes here, or in a similar function
        url = api_reverse("AuthApi:login")
        data = {
            "username":"geparxos",
            "password":"1230852456"
        }
        response = self.client.post(url, data, format='json')
        token = response.data['token']
        print(token)
        self.assertEqual(response.status_code, status.HTTP_200_OK)