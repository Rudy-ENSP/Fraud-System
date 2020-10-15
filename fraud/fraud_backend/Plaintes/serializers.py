from rest_framework.serializers import ModelSerializer,Serializer
from rest_framework import serializers
from .models import Entité, Users, CatPlainte, Plainte


class EntitéSerializer(ModelSerializer):

    class Meta:
        model = Entité
        fields = '__all__'


class UsersSerializer(serializers.Serializer):
    id=serializers.CharField()
    Entité=serializers.CharField()
    Username=serializers.CharField()
    Nom=serializers.CharField()
    Prenom=serializers.CharField()
    Email=serializers.CharField()
    Status=serializers.CharField()
    nom_entité=serializers.CharField()

#class CatPlainteSerializer(ModelSerializer):
#
 #   class Meta:
  #      model = CatPlainte
   #     fields = '__all__'

class CatPlainteSerializer(serializers.Serializer):
    id=serializers.CharField()
    entité=serializers.CharField()
    nom_entité=serializers.CharField()
    name=serializers.CharField()

class PlainteSerializer(serializers.Serializer):
    id=serializers.CharField()
    entité=serializers.CharField()
    nom_entité=serializers.CharField()
    auteur=serializers.CharField()
    date_création=serializers.CharField()
    etat=serializers.CharField()
    details=serializers.CharField()
    response=serializers.CharField()
    Categorie=serializers.CharField()
    nom_Categorie=serializers.CharField()
    title=serializers.CharField()
    state=serializers.CharField()
    assignation=serializers.CharField()
    nom_assigne=serializers.CharField()
    username=serializers.CharField()

