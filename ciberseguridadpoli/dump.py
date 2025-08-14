import os
import django
from django.core.management import call_command

# Establece el módulo de configuración de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ciberseguridadpoli.settings')  # cambia 'mi_proyecto' por el nombre de tu proyecto Django

# Inicializa Django
django.setup()

# Dump de los datos en UTF-8
with open('datos.json', 'w', encoding='utf-8') as f:
    call_command(
        'dumpdata',
        '--natural-primary',
        '--natural-foreign',
        indent=2,
        stdout=f
    )