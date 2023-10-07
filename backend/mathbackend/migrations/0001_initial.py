# Generated by Django 4.2.5 on 2023-10-07 18:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.CharField(max_length=250)),
                ('localization_key', models.CharField(max_length=500)),
                ('admin_name', models.CharField(max_length=500)),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='mathbackend.category')),
            ],
            options={
                'verbose_name_plural': 'Categories',
            },
        ),
        migrations.CreateModel(
            name='Page',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.CharField(max_length=250)),
                ('localization_key', models.CharField(max_length=500)),
                ('admin_name', models.CharField(max_length=500)),
                ('parent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mathbackend.category')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
