from django.contrib import admin
from .models import Entité, Users, CatPlainte, Plainte
#Register your models here.
admin.site.register(Plainte)
admin.site.register(Entité)
admin.site.register(Users)
admin.site.register(CatPlainte)
