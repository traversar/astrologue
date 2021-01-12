# Generated by Django 3.1.3 on 2021-01-03 17:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0006_auto_20201114_2215'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='birthLocation',
            new_name='birthCity',
        ),
        migrations.AddField(
            model_name='profile',
            name='birthCountry',
            field=models.CharField(default='US', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profile',
            name='birthstate',
            field=models.CharField(default='MD', max_length=50),
            preserve_default=False,
        ),
    ]
