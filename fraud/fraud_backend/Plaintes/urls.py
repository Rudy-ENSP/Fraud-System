from django.urls import path
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from Plaintes import views


urlpatterns = [
    
    
    path('listePlainte/', views.listePlainte, name="allplaintes"),
    #path('loginClient/', views.connectUser, name="login"),
    path('login/', views.loginUser, name="login"),
    path('resolues/', views.getResolues, name="Resolues"),
    path('resoudre/', views.resoudre, name="Resoudre"),
    path('createEntite/', views.createEntité, name="createEntité"),
    path('enregistrer/', views.enregistrer, name="createPlaintes"),
    path('nonresolues/', views.getNonResolues, name="NonResolues"),
    path('logout/', views.logout, name="logout"),
    path('listeEntite/', views.listeEntite, name="entités"),
    path('listeCategoriePlainte/', views.listeCategoriePlainte, name="CategoriePlainte"),
    path('createCategoriePlainte/', views.createCategoriePlainte, name="createCategoriePlainte"),
    

]


