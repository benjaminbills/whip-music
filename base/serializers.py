from rest_framework import serializers
from base.models import User
from rest_framework_simplejwt.tokens import RefreshToken
import datetime
from datetime import date

class UserSerializer(serializers.ModelSerializer):
  user_name=serializers.SerializerMethodField(read_only=True)
  id=serializers.SerializerMethodField(read_only=True)
  isAdmin=serializers.SerializerMethodField(read_only=True)
  is_premium=serializers.SerializerMethodField(read_only=True)
  paid_until=serializers.SerializerMethodField(read_only=True)
  check=serializers.SerializerMethodField(read_only=True)
  class Meta:
    model = User
    fields = ['id', 'user_name', 'email','isAdmin', 'is_premium','check', 'paid_until']
  def get_id(self, obj):
    return obj.id  
  def get_isAdmin(self, obj):
    return obj.is_staff
  def get_is_premium(self, obj):
    return obj.is_premium
  def get_paid_until(self, obj):
    return obj.paid_until
  def get_check(self, obj, current_date=datetime.date.today()):
    if obj.paid_until is None:
      return False

    return current_date < obj.paid_until

  def get_user_name(self, obj):
    user_name = obj.user_name
    if user_name== '':
      user_name = obj.email
    return user_name

class UserSerializerWithToken(UserSerializer):
  token = serializers.SerializerMethodField(read_only=True)
  class Meta:
    model = User
    fields = ['id', 'user_name', 'email','isAdmin', 'is_premium', 'token' ]
  def get_token(self,obj):
    token = RefreshToken.for_user(obj)
    return str(token.access_token)