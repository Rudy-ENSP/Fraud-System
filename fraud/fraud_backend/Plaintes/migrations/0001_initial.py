# Generated by Django 2.2.12 on 2020-11-08 07:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CatPlainte',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Entité',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('hierarchie', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('matricule', models.CharField(max_length=50)),
                ('entité', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Plaintes.Entité')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Plainte',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=50)),
                ('state', models.CharField(max_length=15)),
                ('response', models.CharField(max_length=100)),
                ('date_création', models.DateTimeField(auto_now_add=True)),
                ('date_fin', models.DateTimeField(auto_now_add=True)),
                ('details', models.CharField(max_length=100)),
                ('Categorie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Plaintes.CatPlainte')),
                ('assignation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Plaintes.Users')),
                ('auteur', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('entité', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Plaintes.Entité')),
            ],
        ),
        migrations.AddField(
            model_name='catplainte',
            name='entité',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Plaintes.Entité'),
        ),
    ]