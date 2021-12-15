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
import requests
from decouple import config
from django.http import HttpResponse
from django.shortcuts import redirect

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
  user.save()
  return Response({'detail':'User has subscribed to premium'})



@api_view(['POST'])
def process_payment(request):
    data = request.data
    id = data['id']
    phone = data['phone']
    name = data['name']
    email = data['email']
    auth_token= config('FLW_KEY')
    hed = {'Authorization': 'Bearer ' + auth_token}
    data = {
              "tx_ref":f"{id}"+':'+str(math.floor(1000000 + random.random()*9000000)),
              "amount":2000,
              "currency":"KES",
              "redirect_url":"http://localhost:8000/api/user/callback/",
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
    url = ' https://api.flutterwave.com/v3/payments/'
    response = requests.post(url, json=data, headers=hed)
    response=response.json()
    return Response(response)


@api_view(['GET'])
def payment_response(request):
    status=request.GET.get('status', None)
    tx_ref=request.GET.get('tx_ref', None)
    id = tx_ref.split(':')[0]
    print(id)
    user = User.objects.get(id=id)
    user.set_paid_until(datetime.date.today()+timedelta(days=30))
    print(user.set_is_premium())
    user.save()
    print(status)
    print(tx_ref)
    response = redirect("http://localhost:3000/payment-successful")
    return response