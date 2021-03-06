# Generated by Django 3.1.3 on 2021-01-09 16:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0008_auto_20210103_1747'),
    ]

    operations = [
        migrations.CreateModel(
            name='CelestialBodies',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('domicile', models.CharField(max_length=20)),
                ('exaltation', models.CharField(max_length=20)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='ZodiacalSigns',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('mode', models.CharField(max_length=10)),
                ('element', models.CharField(max_length=10)),
                ('ruler', models.CharField(max_length=20)),
                ('summary', models.CharField(max_length=50)),
                ('description', models.TextField()),
            ],
        ),
    ]
