from math2.settings import *

DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': env('DB_NAME'),
        'USER': env('DJANGO_DB_USER'),
        'PASSWORD': env('DJANGO_DB_PASSWORD'),
        'HOST': 'localhost',
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
        }
    },
}

ALLOWED_HOSTS = ('.mathvisualized.dev',)

STATIC_ROOT = '/opt/deployments/mathbackend/static/'

LOCALE_PATHS = (
    '/opt/deployments/mathbackend/locale/',
)

STATIC_URL = '/api/static/'

FORCE_SCRIPT_NAME = '/api'

CSRF_COOKIE_SECURE = True

CSRF_TRUSTED_ORIGINS = [
    'https://www.mathvisualized.dev', 'https://mathvisualized.dev']

SESSION_COOKIE_SECURE = True
