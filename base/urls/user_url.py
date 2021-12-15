from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('', views.getUsers, name='getUsers'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name='registerUser'),
    path('process-payment/', views.process_payment, name='process-payment'),
    path('callback/', views.payment_response, name='payment_response'),
    path('<str:pk>/', views.getUserByID, name='getUserById'),
    path('premium/<str:pk>/', views.updateUserToPremium, name='getUserById'),

]
