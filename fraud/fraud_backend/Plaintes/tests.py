from django.test import TestCase
from django.contrib.auth.models import User
# Create your tests here.
def createUser(username,mail,password):
    settings.configure()
    user = User.objects.create_user(username, mail, password)
    user.last_name = 'CIRT'
    user.save()



user = User.objects.create_user('rudy',password='azerty19@')