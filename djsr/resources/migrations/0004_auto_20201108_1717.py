# Generated by Django 3.1.3 on 2020-11-08 17:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0003_auto_20201108_1713'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='profile_object',
            field=models.TextField(),
        ),
    ]