from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, action,permission_classes
from rest_framework.response import Response
from .models import Plainte,CatPlainte, Entité,Users
from .serializers import PlainteSerializer,CatPlainteSerializer, UsersSerializer, EntitéSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, get_user_model, logout, login
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
def createUser(request):
    username = request.get('username')
    mail = request.get('mail')
    password = request.get('password')
    user = User.objects.create_user(username, mail, password)
    user.last_name = 'CIRT'
    user.save()

@api_view(['POST'])
def deleteUser(request):
    user=Users.get(request.data['id'])
    user.delete()
    data={'status':'success'}
    return JsonResponse(data)

@api_view(['POST'])
def loginUser(request):
    password = request.data['password']
    username = request.data['username']
    success = {'state':'success'}
    fail = {'state':'fail'}
    
    user = authenticate(request, username = username, password = password)
    if user is not None:
        if user.is_staff==False:
            login(request, user)
            print(success)
            return JsonResponse(success)
    else:
        print(fail)
        return JsonResponse(fail)
        

@api_view(['POST'])
def loginAdmin(request):
    password = request.data['password']
    username = request.data['username']
    success = {'state':'success'}
    fail = {'state':'fail'}
    user = authenticate(request, username = username, password = password)
    if user is not None:
        if user.is_staff==True:
            login(request, user)
            return JsonResponse(success)
    else:
        return JsonResponse(fail)


@action(methods = ['GET'], detail = False)
def logout(request):
    logout(request)