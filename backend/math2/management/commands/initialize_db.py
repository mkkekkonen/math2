import os
import json

from django.core.management.base import BaseCommand
from django.conf import settings
from django.db import transaction

from mathbackend.models import Category, Page


def get_ids_from_json(json_data: list) -> list:
    return [item['id'] for item in json_data]


class Command(BaseCommand):
    help = 'Initialize the database with default values'

    def handle(self, *args, **options):
        print('Initializing database...')

        with transaction.atomic():
            self.create_categories()
            self.create_pages()

    def create_categories(self):
        print('Creating categories...')

        json_data = self.load_post_deployment_file('categories.json')

        json_ids = get_ids_from_json(json_data)
        Category.objects.exclude(id__in=json_ids).delete()

        for category in json_data:
            Category.objects.update_or_create(
                id=category['id'],
                defaults={
                    'slug': category['slug'],
                    'admin_name': category['admin_name'],
                    'parent_id': category['parent_id'],
                    'name_fi': category['name_fi'],
                    'name_en': category['name_en'],
                }
            )

    def create_pages(self):
        print('Creating pages...')

        json_data = self.load_post_deployment_file('pages.json')

        json_ids = get_ids_from_json(json_data)
        Page.objects.exclude(id__in=json_ids).delete()

        for page in json_data:
            Page.objects.update_or_create(
                id=page['id'],
                defaults={
                    'slug': page['slug'],
                    'admin_name': page['admin_name'],
                    'parent_id': page['parent_id'],
                    'filename': page['filename'],
                    'name_fi': page['name_fi'],
                    'name_en': page['name_en'],
                }
            )

    def load_post_deployment_file(self, file_name: str) -> list:
        json_file_path = os.path.join(
            settings.BASE_DIR, 'post_deployment', file_name)

        with open(json_file_path, 'r', encoding='utf-8') as json_file:
            json_data = json.load(json_file)
            return json_data
