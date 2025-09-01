

from .common import *
import os

SECRET_KEY = 'django-insecure-=d62-c9-an3b)6vfohbe!s&%rpncl1!&3wwtb+yz^_d=+8s&53'

DEBUG = True

ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173"
]


EMAIL_HOST_USER = '' # Introduce tu email aquí
EMAIL_HOST_PASSWORD = '' # Introduce contraseña para aplicación a través de correo aquí

