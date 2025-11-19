import sys

from math2.settings import *

DEBUG = False

# Add logging configuration for Cloud Run
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
        'json': {
            'format': '{"level": "%(levelname)s", "time": "%(asctime)s", "module": "%(module)s", "message": "%(message)s"}',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'stream': sys.stdout,  # Force stdout
            'formatter': 'verbose',
        },
        'console_json': {
            'class': 'logging.StreamHandler',
            'stream': sys.stdout,
            'formatter': 'json',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False,
        },
        'django.request': {
            'handlers': ['console'],
            'level': 'ERROR',
            'propagate': False,
        },
        'django.db.backends': {
            'handlers': ['console'],
            'level': 'DEBUG' if DEBUG else 'INFO',
            'propagate': False,
        },
        'api': {  # Your app-specific logs
            'handlers': ['console'],
            'level': 'DEBUG' if DEBUG else 'INFO',
            'propagate': False,
        },
    },
}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': env('DB_NAME'),
        'USER': env('DJANGO_DB_USER'),
        'PASSWORD': env('DJANGO_DB_PASSWORD'),
        'HOST': env('DJANGO_DB_HOST'),
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
            'charset': 'utf8mb4',
        }
    },
}

ALLOWED_HOSTS = ('math-backend-703600136736.europe-north1.run.app',
                 '.mathvisualized.dev',
                 'mathvisualized.dev')

STATIC_ROOT = '/app/static/'

LOCALE_PATHS = (
    '/app/locale/',
)

STATIC_URL = '/api/static/'

CSRF_COOKIE_SECURE = True

CSRF_TRUSTED_ORIGINS = [
    'https://www.mathvisualized.dev', 'https://mathvisualized.dev']

SESSION_COOKIE_SECURE = True
