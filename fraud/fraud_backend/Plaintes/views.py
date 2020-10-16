from django.shortcuts import render
from django.core import serializers
from django.http import JsonResponse,HttpResponse
from rest_framework.decorators import api_view, action,permission_classes
from rest_framework.response import Response
from .models import Plainte,CatPlainte, Entité,Users
from .serializers import PlainteSerializer,CatPlainteSerializer, UsersSerializer, EntitéSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, get_user_model, logout, login
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination,LimitOffsetPagination
import json
from datetime import datetime
from django.core.paginator import Paginator
from rest_framework.generics import ListAPIView 
from rest_framework.generics import ListCreateAPIView  
from rest_framework import viewsets  ,status 




#Methodes pour les Users 

@api_view(['GET'])
def listeUsers(request):
    set=Users.objects.all()
    users=[]
    for utilisateur in set:
        users1=get_object_or_404(User,id=(utilisateur.user).id)
        name=users1.first_name +" "+users1.last_name
        users.append({'id':utilisateur.id,'entité':(utilisateur.entité).id,'user':name,'username':users1.username})
    #print(users)

    return JsonResponse(users, safe=False)


class listeUsersListView(ListAPIView):
    set=Users.objects.all()
    users=[]
    for utilisateur in set:
        
        Status=''
        users1=get_object_or_404(User,id=(utilisateur.user).id)
        

        nom_entité=utilisateur.entité.name
        if (users1.is_staff):
            Status='Administrateur'
        else:
            Status='Utilisateur'
        
        users.append({'id':utilisateur.id,
                      'Entité':(utilisateur.entité).id,
                      'Username':users1.username,
                      'Nom':users1.first_name,
                      'Prenom':users1.last_name,
                      'Email':users1.email,
                      'Status':Status,
                      'nom_entité':nom_entité

                      })
    #print(users)

    queryset=users
    serializer_class=UsersSerializer
    pagination_class=PageNumberPagination    

@api_view(['POST'])
def UserProfile(request):
    user = authenticate(request, username = request.data['user'], password = request.data['password'])
    set = User.objects.filter(username = request.data['user'])
    users=[]
    for utilisateur in set:
        users.append({'nom':utilisateur.first_name,'prenom':utilisateur.last_name,'email':utilisateur.email})
    print(users)

    return JsonResponse(users, safe=False)
            
    


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
    return JsonResponse({'id':entité.id,'state':"success"})

@api_view(['POST'])
def deleteEntité(request):
    entité=get_object_or_404(Entité, id = request.data['id'])
    entité.delete()
    data={'status':'success'}
    return JsonResponse(data)

@api_view(['POST'])
def deletemultiEntite(request):
    list=request.data['delete_list']
    for i in list:
       entité=get_object_or_404(Entité, id = i)
       entité.delete()
    
    data={'status':'success'}
    return JsonResponse(data)

@api_view(['POST'])
def editEntité(request):
    entité = get_object_or_404(Entité, id = request.data['id'])
    entité.hierarchie = request.data['Hierarchie']
    entité.name = request.data['Nom']
    entité.save()
    data = {'status':'success'}
    return JsonResponse(data)

class listeEntiteListView(ListAPIView):
    entité = get_list_or_404(Entité)
    queryset=entité
    serializer_class=EntitéSerializer
    pagination_class=PageNumberPagination



#Methodes pour les Categories de Plainte
@api_view(['POST'])
def createCategoriePlainte(request):
    entité = get_object_or_404(Entité, id=request.data['Entité'])
    categoriePlainte = CatPlainte(
        name=request.data['Nom'],
        entité=entité
    )
    data={'state':"success"}
    #echec={'state':"echec"}
    categoriePlainte.save()
    return JsonResponse({'id':categoriePlainte.id,'state':"success"})

@api_view(['POST'])
def deleteCategoriePlainte(request):
    Categorie=get_object_or_404(CatPlainte, id = request.data['id'])
    Categorie.delete()
    data={'status':'success'}
    return JsonResponse(data)

@api_view(['POST'])
def deletemultiCategoriePlainte(request):
    list=request.data['delete_list']
    for i in list:
      Categorie=get_object_or_404(CatPlainte, id = i)
      Categorie.delete()

    data={'status':'success'}
    return JsonResponse(data)

@api_view(['POST'])
def editCategoriePlainte(request):
    Categorie = get_object_or_404(CatPlainte, id = request.data['id'])
    Categorie.entité = get_object_or_404(Entité, id=request.data['Entité'])
    Categorie.name = request.data['Nom']
    Categorie.save()
    data = {'status':'success'}
    return JsonResponse(data)
@api_view(['GET'])
def listeCategoriePlainte(request):
    
    set = get_list_or_404(CatPlainte)
    cat=[]
    for catPlainte in set:
         entité=get_object_or_404(Entité,id=(catPlainte.entité).id)
         cat.append({'id':catPlainte.id,'entité':(entité).id,'nom_entité':(entité).name,'name':catPlainte.name})
    
    
   
    serializer = CatPlainteSerializer(cat,many=True)
    #return JsonResponse(serializer.data, safe=False)
    
    return JsonResponse(serializer.data, safe=False)

class CatPlainteListView(ListAPIView):
    set = get_list_or_404(CatPlainte)
    cat=[]
    for catPlainte in set:
         entité=get_object_or_404(Entité,id=(catPlainte.entité).id)
         cat.append({'id':catPlainte.id,'entité':(entité).id,'nom_entité':(entité).name,'name':catPlainte.name})
    
    queryset=cat
    serializer_class=CatPlainteSerializer
    pagination_class=PageNumberPagination


#Methodes pour les Plaintes
@api_view(['POST'])
def delete(request):
    plainte=get_object_or_404(Plainte, id = request.data['id'])
    plainte.delete()
    data={'state':'success'}
    return JsonResponse(data)

@api_view(['POST'])
def deletemulti(request):
    list=request.data['delete_list']
    for i in list:
      plainte=get_object_or_404(Plainte, id = i)
      plainte.delete()

    data={'status':'success'}
    return JsonResponse(data)

@api_view(['POST'])
def editer(request):
    user = authenticate(request, username = request.data['user'], password = request.data['password'])
    
    plainte = get_object_or_404(Plainte, id = request.data['id'])
    plainte.details = request.data['description']
    plainte.title=request.data['cas']
    plainte.entité = get_object_or_404(Entité, id=request.data['entité'])
    plainte.auteur = user
    plainte.assignation=get_object_or_404(Users, id=request.data['Assignation'])
    plainte.save()
    data = {'state':'success'}
    return JsonResponse(data)

@api_view(['POST'])
def enregistrer(request):
    print(request.data)
    user = authenticate(request, username = request.data['user'], password = request.data['password'])
    entité = get_object_or_404(Entité, id=request.data['entité'])
    assignation= get_object_or_404(Users, id=request.data['Assignation'])
    categorie=get_object_or_404(CatPlainte, id=request.data['Categorie'])
    plainte = Plainte(
        title=request.data['cas'],
        details=request.data['description'],
        entité =entité,
        auteur=user,
        state = request.data['state'],
        assignation= assignation,
        Categorie=categorie
    )
    data={'state':"success"}
    plainte.save()
    return JsonResponse({'id':plainte.id,'state':"success",'username':request.data['user']})

@api_view(['POST'])
def resoudre(request):
    user = authenticate(request, username = request.data['user'], password = request.data['password'])
    plainte = get_object_or_404(Plainte, id=request.data['id'])
    plainte.response=request.data['Reponse']
    plainte.state='resolu'
    plainte.date_fin=datetime.now()
    data={'state':"success"}
    plainte.save()
    return JsonResponse(data)

@api_view(['POST'])
def setState(request):
    user = authenticate(request, username = request.data['user'], password = request.data['password'])
    plainte = get_object_or_404(Plainte, id=request.data['id'])
    plainte.state='resolu'
    plainte.date_fin=datetime.now()
    data={'state':"success"}
    plainte.save()
    return JsonResponse(data)

@api_view(['POST'])
def getResolues(request):
    plaintes=[]
    data = {"echec":"echec"}
    user = authenticate(username = request.data['user'], password = request.data['password'])
    
    if (user.is_staff == False):
        set =Plainte.objects.filter(state = 'resolu',auteur=user,entité=user.users.entité).order_by('date_création').reverse()
        for plainte in set:
                entité=get_object_or_404(Entité,id=(plainte.entité).id)
                cat=get_object_or_404(CatPlainte,id=(plainte.Categorie).id)
                users=get_object_or_404(Users,id=(plainte.assignation).id)
                user=get_object_or_404(User,id=(users.user).id)
                name=user.first_name+" "+user.last_name

                plaintes.append({'id':plainte.id,
                                'entité':plainte.entité.id,
                                'nom_entité':(entité).name,
                                'auteur':plainte.auteur.id,
                                'nom_auteur':plainte.auteur.username,
                                'date_création':plainte.date_création,
                                'etat':plainte.state,
                                'details':plainte.details,
                                'response':plainte.response,
                                'Categorie':plainte.Categorie.id,
                                'nom_Categorie':cat.name,
                                'title':plainte.title,
                                'state':plainte.state,
                                'assignation':(plainte.assignation).id,
                                'nom_assigne':name,
                                'username':request.data['user']
                                })
                                
       
        serializer=PlainteSerializer(plaintes,many=True)
        return JsonResponse(serializer.data,safe=False)
    else:
        set =Plainte.objects.filter(state = 'resolu').order_by('date_création').reverse()
        for plainte in set:
                entité=get_object_or_404(Entité,id=(plainte.entité).id)
                cat=get_object_or_404(CatPlainte,id=(plainte.Categorie).id)
                users=get_object_or_404(Users,id=(plainte.assignation).id)
                user=get_object_or_404(User,id=(users.user).id)
                name=user.first_name+" "+user.last_name
                plaintes.append({'id':plainte.id,
                                'entité':plainte.entité.id,
                                'nom_entité':(entité).name,
                                'auteur':plainte.auteur.id,
                                'nom_auteur':plainte.auteur.username,
                                'date_création':plainte.date_création,
                                'etat':plainte.state,
                                'details':plainte.details,
                                'response':plainte.response,
                                'Categorie':plainte.Categorie.id,
                                'nom_Categorie':cat.name,
                                'title':plainte.title,
                                'state':plainte.state,
                                'assignation':(plainte.assignation).id,
                                'nom_assigne':name,
                                'username':request.data['user']
                                })
        serializer=PlainteSerializer(plaintes,many=True)
        return JsonResponse(serializer.data,safe=False)
    return JsonResponse(data)



@api_view(['POST'])
def getWaiting(request):
    plaintes=[]
    data = {"echec":"echec"}
    user = authenticate(username = request.data['user'], password = request.data['password'])
    
    if (user.is_staff == False):
        set =Plainte.objects.filter(state = 'waiting',auteur=user,entité=user.users.entité).order_by('date_création').reverse()
        for plainte in set:
                entité=get_object_or_404(Entité,id=(plainte.entité).id)
                cat=get_object_or_404(CatPlainte,id=(plainte.Categorie).id)
                users=get_object_or_404(Users,id=(plainte.assignation).id)
                user=get_object_or_404(User,id=(users.user).id)
                name=user.first_name+" "+user.last_name

                plaintes.append({'id':plainte.id,
                                'entité':plainte.entité.id,
                                'nom_entité':(entité).name,
                                'auteur':plainte.auteur.id,
                                'nom_auteur':plainte.auteur.username,
                                'date_création':plainte.date_création,
                                'etat':plainte.state,
                                'details':plainte.details,
                                'response':plainte.response,
                                'Categorie':plainte.Categorie.id,
                                'nom_Categorie':cat.name,
                                'title':plainte.title,
                                'state':plainte.state,
                                'assignation':(plainte.assignation).id,
                                'nom_assigne':name,
                                'username':request.data['user']
                                })
                                
        serializer=PlainteSerializer(plaintes,many=True)
        return JsonResponse(serializer.data,safe=False)
    else:
        set =Plainte.objects.filter(state = 'waiting').order_by('date_création').reverse()
        for plainte in set:
                entité=get_object_or_404(Entité,id=(plainte.entité).id)
                cat=get_object_or_404(CatPlainte,id=(plainte.Categorie).id)
                users=get_object_or_404(Users,id=(plainte.assignation).id)
                user=get_object_or_404(User,id=(users.user).id)
                name=user.first_name+" "+user.last_name
                plaintes.append({'id':plainte.id,
                                'entité':plainte.entité.id,
                                'nom_entité':(entité).name,
                                'auteur':plainte.auteur.id,
                                'nom_auteur':plainte.auteur.username,
                                'date_création':plainte.date_création,
                                'etat':plainte.state,
                                'details':plainte.details,
                                'response':plainte.response,
                                'Categorie':plainte.Categorie.id,
                                'nom_Categorie':cat.name,
                                'title':plainte.title,
                                'state':plainte.state,
                                'assignation':(plainte.assignation).id,
                                'nom_assigne':name,
                                'username':request.data['user']
                                })
        serializer=PlainteSerializer(plaintes,many=True)
        return JsonResponse(serializer.data,safe=False)
    return JsonResponse(data)

@api_view(['POST'])
def getNonResolues(request):
    plaintes=[]
    data = {"echec":"echec"}
    user = authenticate(username = request.data['user'], password = request.data['password'])
    
    if (user.is_staff == False):
        set =Plainte.objects.filter(state = 'ajoutée',auteur=user,entité=user.users.entité).order_by('date_création').reverse()
        for plainte in set:
                entité=get_object_or_404(Entité,id=(plainte.entité).id)
                cat=get_object_or_404(CatPlainte,id=(plainte.Categorie).id)
                users=get_object_or_404(Users,id=(plainte.assignation).id)
                user=get_object_or_404(User,id=(users.user).id)
                name=user.first_name+" "+user.last_name

                plaintes.append({'id':plainte.id,
                                'entité':plainte.entité.id,
                                'nom_entité':(entité).name,
                                'auteur':plainte.auteur.id,
                                'nom_auteur':plainte.auteur.username,
                                'date_création':plainte.date_création,
                                'etat':plainte.state,
                                'details':plainte.details,
                                'response':plainte.response,
                                'Categorie':plainte.Categorie.id,
                                'nom_Categorie':cat.name,
                                'title':plainte.title,
                                'state':plainte.state,
                                'assignation':(plainte.assignation).id,
                                'nom_assigne':name,
                                'username':request.data['user']
                                })
        serializer=PlainteSerializer(plaintes,many=True)
        return JsonResponse(serializer.data,safe=False)
    else:
        set =Plainte.objects.filter(state = 'ajoutée').order_by('date_création').reverse()
        for plainte in set:
                entité=get_object_or_404(Entité,id=(plainte.entité).id)
                cat=get_object_or_404(CatPlainte,id=(plainte.Categorie).id)
                users=get_object_or_404(Users,id=(plainte.assignation).id)
                user=get_object_or_404(User,id=(users.user).id)
                name=user.first_name+" "+user.last_name
                plaintes.append({'id':plainte.id,
                                'entité':plainte.entité.id,
                                'nom_entité':(entité).name,
                                'auteur':plainte.auteur.id,
                                'nom_auteur':plainte.auteur.username,
                                'date_création':plainte.date_création,
                                'etat':plainte.state,
                                'details':plainte.details,
                                'response':plainte.response,
                                'Categorie':plainte.Categorie.id,
                                'nom_Categorie':cat.name,
                                'title':plainte.title,
                                'state':plainte.state,
                                'assignation':(plainte.assignation).id,
                                'nom_assigne':name,
                                'username':request.data['user']
                                })
        serializer=PlainteSerializer(plaintes,many=True)
        return JsonResponse(serializer.data,safe=False)
    return JsonResponse(data)




@api_view(['POST'])
def listePlainte(request):
    plaintes=[]
    data = {"echec":"echec"}
    user = authenticate(username = request.data['user'], password = request.data['password'])
    
    if (user.is_staff == False):
        set =Plainte.objects.filter(auteur=user,entité=user.users.entité).order_by('date_création').reverse()
        for plainte in set:
                entité=get_object_or_404(Entité,id=(plainte.entité).id)
                cat=get_object_or_404(CatPlainte,id=(plainte.Categorie).id)
                users=get_object_or_404(Users,id=(plainte.assignation).id)
                user=get_object_or_404(User,id=(users.user).id)
                name=user.first_name+" "+user.last_name

                plaintes.append({'id':plainte.id,
                                'entité':plainte.entité.id,
                                'nom_entité':(entité).name,
                                'auteur':plainte.auteur.id,
                                'nom_auteur':plainte.auteur.username,
                                'date_création':plainte.date_création,
                                'etat':plainte.state,
                                'details':plainte.details,
                                'response':plainte.response,
                                'Categorie':plainte.Categorie.id,
                                'nom_Categorie':cat.name,
                                'title':plainte.title,
                                'state':plainte.state,
                                'assignation':(plainte.assignation).id,
                                'nom_assigne':name,
                                'username':request.data['user']
                                })
        serializer=PlainteSerializer(plaintes,many=True)
        return JsonResponse(serializer.data,safe=False)
    else:
        set =Plainte.objects.filter().order_by('date_création').reverse()
        for plainte in set:
                entité=get_object_or_404(Entité,id=(plainte.entité).id)
                cat=get_object_or_404(CatPlainte,id=(plainte.Categorie).id)
                users=get_object_or_404(Users,id=(plainte.assignation).id)
                user=get_object_or_404(User,id=(users.user).id)
                name=user.first_name+" "+user.last_name
                plaintes.append({'id':plainte.id,
                                'entité':plainte.entité.id,
                                'nom_entité':(entité).name,
                                'auteur':plainte.auteur.id,
                                'nom_auteur':plainte.auteur.username,
                                'date_création':plainte.date_création,
                                'etat':plainte.state,
                                'details':plainte.details,
                                'response':plainte.response,
                                'Categorie':plainte.Categorie.id,
                                'nom_Categorie':cat.name,
                                'title':plainte.title,
                                'state':plainte.state,
                                'assignation':(plainte.assignation).id,
                                'nom_assigne':name,
                                'username':request.data['user']
                                })
        serializer=PlainteSerializer(plaintes,many=True)
        return JsonResponse(serializer.data,safe=False)
   
    
#Autres méthodes


@api_view(['POST'])
def CreateUser(request):
    username = request.data['Username']
    mail = request.data['Email']
    password = request.data['Password']
    first_name = request.data['Nom']
    sur_name = request.data['Prenom']
    
    fails = {"state":"User exist"}
    user = User.objects.create_user(username, mail, password)
    user.last_name = sur_name
    user.first_name=first_name
    user.save()
    utilisateur = Users(
        entité=get_object_or_404(Entité, id=request.data['Entité']),
        user=user,
    )
    utilisateur.save()
    data = {"state":"success"} 
    return JsonResponse({'id':utilisateur.id,'state':"success"})

@api_view(['POST'])
def editUsers(request):
    username = request.data['Username']
    mail = request.data['Email']
    password = request.data['Password']
    first_name = request.data['Nom']
    sur_name = request.data['Prenom']
    
    fails = {"state":"User exist"}
    users = get_object_or_404(Users, id=request.data['id'])
    users.entité=get_object_or_404(Entité, id=request.data['Entité'])
    
    user=get_object_or_404(User, id=users.user.id)
    user.last_name = sur_name
    user.first_name=first_name
    user.username=username
    user.password=password
    user.email=mail
    user.save()
    users.user=user
    users.save()
    data = {"state":"success"} 
    return JsonResponse(data)

@api_view(['POST'])
def loginUser(request):
    password = request.data['password']
    username = request.data['username']
    success = {'state':'success'}
    fail = {'state':'fail'}
    
    user = authenticate(request, username = username, password = password)
    if user is not None:
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
    user=get_object_or_404(Users, id = request.data['id'])
    u=get_object_or_404(User, id = user.user.id)
    user.delete()
    u.delete()
    user.user.delete()

    data={'status':'success'}
    return JsonResponse(data)


@api_view(['POST'])
def deletemultiUser(request):
    list=request.data['delete_list']
    for i in list:
       user=get_object_or_404(Users, id = i)
       u=get_object_or_404(User, id = user.user.id)
       user.delete()
       u.delete()
       user.user.delete()
    data={'status':'success'}
    return JsonResponse(data)
#@action(methods = ['GET'], detail = False)
#def logout(request):
  #  logout(request)