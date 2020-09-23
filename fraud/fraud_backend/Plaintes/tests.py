from django.test import TestCase
from django.contrib.auth.models import User
# Create your tests here.
settings.configure()

serializer = User.objects.all()
print(serializer)