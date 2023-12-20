from rest_framework import serializers

from mathbackend.models import Category, Page


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'slug', 'parent', 'name_fi', 'name_en']


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ['id', 'slug', 'parent', 'filename', 'name_fi',
                  'name_en']
