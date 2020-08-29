from rest_framework.serializers import ModelSerializer
from Plaintes.models import Entité, Users, CatPlainte, Plainte


class EntitéSerializer(ModelSerializer):

    class Meta:
        model = Entité
        fields = '__all__'


class UsersSerializer(ModelSerializer):

    class Meta:
        model = Users
        fields = '__all__'


class CatPlainteSerializer(ModelSerializer):

    class Meta:
        model = CatPlainte
        fields = '__all__'


class PlainteSerializer(ModelSerializer):

    class Meta:
        model = Plainte
        fields = '__all__'
