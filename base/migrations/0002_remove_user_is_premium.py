# Generated by Django 3.2.8 on 2021-12-15 11:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_premium',
        ),
    ]
