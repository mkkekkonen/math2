# Generated by Django 5.0 on 2023-12-18 21:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mathbackend', '0002_page_filename'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='localization_key',
        ),
        migrations.RemoveField(
            model_name='page',
            name='localization_key',
        ),
        migrations.AddField(
            model_name='category',
            name='name_en',
            field=models.CharField(default='-', max_length=500),
        ),
        migrations.AddField(
            model_name='category',
            name='name_fi',
            field=models.CharField(default='-', max_length=500),
        ),
        migrations.AddField(
            model_name='page',
            name='name_en',
            field=models.CharField(default='-', max_length=500),
        ),
        migrations.AddField(
            model_name='page',
            name='name_fi',
            field=models.CharField(default='-', max_length=500),
        ),
    ]
