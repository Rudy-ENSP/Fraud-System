from django.db import models
from django.contrib.auth.models import User


class Entité(models.Model):
    id = models.AutoField(primary_key=True)
    name=models.CharField(max_length=50)
    hierarchie=models.IntegerField()
     #hierarchie correspond au niveau du service  par ordre croissant des collaborateurs aux directions
    def __str__(self):
    	return str(self.name)


class Users(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    entité = models.ForeignKey(Entité, on_delete=models.CASCADE)
    def __str__(self):
    	return str(self.user.username)+" "+str(self.user.id)

class CatPlainte(models.Model):
    id = models.AutoField(primary_key=True)
    name=models.CharField(max_length=50)
    entité = models.ForeignKey(Entité, on_delete=models.CASCADE)
    def __str__(self):
    	return str(self.name)

class Plainte(models.Model):
    
    id=models.AutoField(primary_key=True)
    title = models.CharField(max_length=50)
    Categorie=models.ForeignKey(CatPlainte, on_delete=models.CASCADE)
    state = models.CharField(max_length=15)
    response = models.CharField(max_length=100)
    auteur = models.ForeignKey(User, on_delete=models.CASCADE)
    date_création = models.DateTimeField(auto_now_add=True)
    date_fin = models.DateTimeField(auto_now_add=True)
    details = models.CharField(max_length=100)
    entité= models.ForeignKey(Entité, on_delete=models.CASCADE)
    assignation=models.ForeignKey(Users, on_delete=models.CASCADE)
    #dans le cas de l'assignation de la plainte a un employé pour resolution
    def setState(self, state):
        self.state=state
    def __str__(self):
    	return str(self.title)

