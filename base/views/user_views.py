from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.serializers import UserSerializer, UserSerializerWithToken
from base.models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  def validate(self, attrs):
      data = super().validate(attrs)

      serializer = UserSerializerWithToken(self.user).data

      for k, v in serializer.items():
        data[k] = v

      return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
  data=request.data
  
  user = User.objects.create(
    user_name = data['username'],
    email = data['email'],
    password = make_password(data['password'])
  )
  serializer = UserSerializerWithToken(user, many=False)
  
  return Response(serializer.data)


@api_view(['GET'])
def getUserByID(request, pk):
  user = User.objects.get(id=pk)
  serializer = UserSerializer(user, many=False)
  return Response(serializer.data)

@api_view(['GET'])
def getUsers(request):
  users = User.objects.all()
  serializer = UserSerializer(users, many=True)
  return Response({'users':serializer.data})
