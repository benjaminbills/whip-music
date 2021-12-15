from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.serializers import UserSerializer, UserSerializerWithToken
from base.models import User
import datetime
import math
import random
# import requests
from decouple import config

from datetime import date, timedelta
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
  return Response({'user':serializer.data})

@api_view(['POST'])
def updateUserToPremium(request, pk):
  user = User.objects.get(id=pk)
  user.set_paid_until(datetime.date.today()+timedelta(days=30))
  print(user.set_is_premium())
  user.save()
  return Response({'detail':'User has subscribed to premium'})

def process_payment(name,email,amount,phone):
     auth_token= config('SECRET_KEY')
     hed = {'Authorization': 'Bearer ' + auth_token}
     data = {
                "tx_ref":''+str(math.floor(1000000 + random.random()*9000000)),
                "amount":amount,
                "currency":"KES",
                "redirect_url":"http://localhost:8000/callback",
                "payment_options":"card",
                "meta":{
                    "consumer_id":23,
                    "consumer_mac":"92a3-912ba-1192a"
                },
                "customer":{
                    "email":email,
                    "phonenumber":phone,
                    "name":name
                },
                "customizations":{
                    "title":"Whip Music Africa",
                    "description":"Upgrade to premium",
                    "logo":"https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
                }
                }
     url = ' https://api.flutterwave.com/v3/payments'
     response = requests.post(url, json=data, headers=hed)
     response=response.json()
     link=response['data']['link']
     return link


