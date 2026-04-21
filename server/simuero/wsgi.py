"""
WSGI config for Simuero project.
"""
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'simuero.settings')
application = get_wsgi_application()
