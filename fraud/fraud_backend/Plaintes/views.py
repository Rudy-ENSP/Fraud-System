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


#Methodes pour les Entités


@api_view(['POST'])
def createEntité(request):
    entité = Entité(
        name=request.data['Nom'],
        hierarchie=request.data['Hierarchie'],
    )
    data={'state':"success"}
    #echec={'state':"echec"}
    entité.save()
    return JsonResponse(data)

@api_view(['GET'])
def listeEntite(request):
    entité = get_list_or_404(Entité)
    serializer = EntitéSerializer(entité,many=True)
    return JsonResponse(serializer.data, safe=False)


#Methodes pour les Categories de Plainte
@api_view(['POST'])
def createCategoriePlainte(request):
    entité = get_object_or_404(Entité, hierarchie=request.data['Entité'])
    categoriePlainte = CatPlainte(
        name=request.data['Nom'],
        entité=entité
    )
    data={'state':"success"}
    #echec={'state':"echec"}
    categoriePlainte.save()
    return JsonResponse(data)

@api_view(['GET'])
def listeCategoriePlainte(request):
    catPlainte = get_list_or_404(CatPlainte)
    serializer = CatPlainteSerializer(catPlainte,many=True)
    return JsonResponse(serializer.data, safe=False)


#Methodes pour les Plaintes


@api_view(['POST'])
def enregistrer(request):
    user = authenticate(request, username = request.data['user'], password = request.data['password'])
    entité = get_object_or_404(Entité, name=request.data['entité'])
    plainte = Plainte(
        title=request.data['cas'],
        details=request.data['description'],
        entité =entité,
        auteur=user,
        state = request.data['state']
    )
    data={'state':"success"}
    plainte.save()
    return JsonResponse(data)

@api_view(['POST'])
def resoudre(request):
    user = authenticate(request, username = request.data['user'], password = request.data['password'])
    plainte = get_object_or_404(Plainte, id=request.data['id'])
    plainte.response=request.data['Reponse']
    plainte.state='resolu'
    data={'state':"success"}
    plainte.save()
    return JsonResponse(data)

@api_view(['POST'])
def getResolues(request):
    data = {"echec":"echec"}
    user = authenticate(request, username = request.data['user'], password = request.data['password'])
    plainte = Plainte.objects.filter(state = 'resolu', auteur = user).order_by('date_création').reverse()
    serializer = PlainteSerializer(plainte,many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
def getNonResolues(request):
	user = authenticate(request, username = request.data['user'], password = request.data['password'])
	data = {"echec":"echec"}
	if (user.is_staff == False):
        	plainte = Plainte.objects.filter(state = 'ajoutée', entité=user.users.entité).order_by('date_création').reverse()
        	serializer = PlainteSerializer(plainte,many=True)
        	return JsonResponse(serializer.data, safe=False)
	return JsonResponse(data)

@api_view(['POST'])
def listePlainte(request):
    data = {"echec":"echec"}
    user = authenticate(username = request.data['user'], password = request.data['password'])
    plainte = Plainte.objects.filter(auteur = user).order_by('date_création').reverse()
    serializer = PlainteSerializer(plainte,many=True)
    return JsonResponse(serializer.data, safe=False)  

@api_view(['POST'])
def getSolved(request):
    data = {"echec":"echec"}
    user = authenticate(request, username = request.data['user'], password = request.data['password'])
    plainte = Plainte.objects.filter(state = 'resolu', auteur = user).order_by('date_création').reverse()
    serializer = PlainteSerializer(plainte,many=True)
    return JsonResponse(serializer.data, safe=False)


#Autres méthodes


@api_view(['POST'])
def createUser(request):
    username = request.get('username')
    mail = request.get('mail')
    password = request.get('password')
    user = User.objects.create_user(username, mail, password)
    user.last_name = 'CIRT'
    user.save()



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

@api_view(['POST'])
def deleteUser(request):
    user=Users.get(request.data['id'])
    user.delete()
    data={'status':'success'}
    return JsonResponse(data)

#@action(methods = ['GET'], detail = False)
#def logout(request):
  #  logout(request)