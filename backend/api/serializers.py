from rest_framework import serializers

from mathbackend.models import Category, Page


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'slug', 'localization_key', 'parent']


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ['id', 'slug', 'localization_key', 'parent']
