from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from CalendarBackend.controllers.controllers import AuthController
from rest_framework import status


# Create your views here.
class Login(APIView):
    authentication_classes = []

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        # print(username, password)
        token = AuthController.login(username=username,password=password)
        if token is not None:
            return Response({"token":token}, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class Logout(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request, format=None):
        # request.user.auth_token.delete()
        # return Response(status=status.HTTP_200_OK)
        print(request.data)


class Register(APIView):
    authentication_classes = []

    def post(self, request, format=None):
        # serializer = serializers.UserSerializer(data=request.data)
        # if serializer.is_valid():
        #     user = serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        print(request.data)