"""
WSGI config for math2 project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

from django.core.wsgi import get_wsgi_application
import os
import environ

env = environ.Env()
environ.Env.read_env()

if env('DJANGO_ENV') == 'prod':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'math2.settings_prod')
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'math2.settings')

application = get_wsgi_application()
