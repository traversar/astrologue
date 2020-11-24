"""
WSGI config for djsr project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
"""

import os

if os.environ['NODE_ENV'] == 'development':
    from dotenv import load_dotenv, find_dotenv
    load_dotenv(find_dotenv())

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djsr.settings')

application = get_wsgi_application()