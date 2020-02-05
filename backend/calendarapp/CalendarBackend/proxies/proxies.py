from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token


class StateProxy:
    @staticmethod
    def loadCurrentState():
        pass

    @staticmethod
    def loadPreviousState(step):
        pass


class ActionProxy:
    pass


class AuthProxy:
    @staticmethod
    def login(username, password):
        user = authenticate(username=username, password=password)
        if user is not None:
            try:
                tmpVar = Token.objects.get(user=user)
                # no need to create new token, token already exists
                pass
            except:
                Token.objects.create(user=user)    
            return user        
        else:
            return None
