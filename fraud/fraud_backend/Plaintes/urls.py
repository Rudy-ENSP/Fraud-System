from django.urls import path
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from Plaintes import views


urlpatterns = [
    
    
    path('listePlainte/', views.listePlainte, name="allplaintes"),
    path('editer/', views.editer, name="editerPlaintes"),
    path('delete/', views.delete, name="deletePlaintes"),
    path('resolues/', views.getResolues, name="Resolues"),
    path('resoudre/', views.resoudre, name="Resoudre"),
     path('valider/', views.setState, name="setState"),
    path('enregistrer/', views.enregistrer, name="createPlaintes"),
    path('nonresolues/', views.getNonResolues, name="NonResolues"),
    path('waiting/', views.getWaiting, name="Waiting"),

    path('logout/', views.logout, name="logout"),
    #path('loginClient/', views.connectUser, name="login"),
    path('login/', views.loginUser, name="login"),

    path('listeEntite/', views.listeEntite, name="entités"),
    path('createEntite/', views.createEntité, name="createEntité"),
    path('editEntite/', views.editEntité, name="editEntité"),
    path('deleteEntite/', views.deleteEntité, name="deleteEntité"),

    path('listeCategoriePlainte/', views.listeCategoriePlainte, name="CategoriePlainte"),
    path('createCategoriePlainte/', views.createCategoriePlainte, name="createCategoriePlainte"),
    path('editCategoriePlainte/', views.editCategoriePlainte, name="editCategoriePlainte"),
    path('deleteCategoriePlainte/', views.deleteCategoriePlainte, name="deleteCategoriePlainte"),

    path('listeUsers/', views.listeUsers, name="listeUsers"),

]


