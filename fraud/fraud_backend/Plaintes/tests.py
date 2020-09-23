from django.test import TestCase
from django.contrib.auth.models import User
# Create your tests here.


serializer = User.objects.all()
print(serializer)