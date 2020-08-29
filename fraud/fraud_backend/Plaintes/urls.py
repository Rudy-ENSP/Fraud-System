from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from Plaintes import views


urlpatterns = [
    #path('create/', views.create, name = "create"),
    #path('edit/',views.edit, name="edit"),
    #path('delete/<ticket_id>',views.delete, name="delete"),
    #path('liste/', views.getTickets, name="liste"),
    #path('loginClient/', views.connectUser, name="login"),
    path('login/', views.loginUser, name="login"),
    #path('solved/', views.getSolved, name="solved"),
    #path('validate/', views.setSolved, name="validate"),
    #path('createService/', views.createService, name="createService"),
    #path('listeAdmin/', views.ListAdmin, name="admin"),
    path('logout/', views.logout, name="logout"),
    #path('unsolved/', views.getUnsolved, name="unsolved"),
    #path('listeService/', views.ListService, name="services"),

]


