# ⭐ ¡Bienvenidos a Ciberseguridad Poli! ⭐

Ciberseguridad Poli es un proyecto que busca educar a las personas en conceptos de ciberseguridad, a través de módulos de aprendizaje y evaluaciones de conocimiento, con el fin de concientizar a la gente en los posibles riesgos que se pueden encontrar al navegar a través de tecnologías de la información y comunicación (TICs), y de esta manera, ser menos propensos a convertirse en víctimas de ciberdelitos, los cuales pueden traer problemas de seguridad en la vida real, económicos, entre otros. Actualmente, este proyecto todavía está en desarrollo, y se pretende agregar muchas más funciones y mejorar la aplicación con el tiempo 💫.

## ¿De dónde viene este proyecto?

Ciberseguridad Poli es un proyecto académico originado en el Politécnico Colombiano Jaime Isaza Cadavid, la cual es una Institución de Educación Superior (IES) acreditada en alta calidad para el programa de Ingeniería Informática. En esta institución estudiamos los participantes de este proyecto.

## ¿Cuál es el objetivo de este proyecto?
El objetivo de este proyecto es generar un impacto positivo a los usuarios de la plataforma, a través del aprendizaje de la ciberseguridad—ámbito sumamente importante en la era actual, en la cual impera el uso de las TICs, y a la vez, mucha gente no está lo suficientemente preparada para abordar situaciones en las que su seguridad pueda estar comprometida.

## ¿Qué tecnologías/herramientas/bibliotecas usa este proyecto?
Este proyecto usa herramientas libres para el front-end y back-end. Las herramientas que usa son las siguientes:
### Lenguajes de programación:
* Python
* JavaScript
### Frameworks/Bibliotecas:
#### Back-end:
* Django
* Django REST framework
* Django CORS headers
* Pillow
* DJ Database URL

Y más herramientas que vienen por defecto.
### Front-end
* React (A través de Vite)
* Axios
* React Router
* AdminLTE para plantillas visuales

## ¿Cómo se usa el proyecto?

Teniendo en cuenta que el proyecto no está desplegado en la nube, para usarlo de manera local se requiere tener instalado [Python](https://www.python.org/downloads/) y [Node.js](https://nodejs.org/en/download) en tu computador. Las versiones de Python y Node.js usadas son 3.13 y 22.13, respectivamente. Una vez instaladas estas herramientas, debes clonar el proyecto y acceder a su respectiva carpeta. Dentro de la carpeta del proyecto clonado, debes hacer lo siguiente:

### Activación del back-end
Dentro de la carpeta descargada, abre la terminal e introduce los siguientes comandos (sin los comentarios).
```
python -m venv venv // Crea el entorno virtual para aislar dependencias y evitar conflictos (solo se ejecuta este comando la primera vez).
.\venv\Scripts\activate // Activa el entorno virtual
cd .\CiberseguridadPoli-Django\ // Se cambia la ubicación a la raíz del backend.
pip install -r requirements.txt // Instala todas las bibliotecas de Python usadas para este proyecto.
python manage.py runserver // Inicia el servidor de Django (por defecto en el localhost:8000).
```

### Activación del front-end
En la terminal, dentro de la carpeta CiberseguridadPoli-React introduce los siguientes comandos:
```
npm install // Instala las dependencias de la plantilla de Vite + React.
npm run dev // Inicializa el servidor front-end (por defecto en el localhost:5173).
```
Nota: la aplicación funciona con los puertos por defecto. Si se usan otros, también se debe configurar directamente en la aplicación.

¡Y listo! Ya estará activado el proyecto y podrá accederse a los módulos a través de un correo con dominio del Politécnico Jaime Isaza Cadavid.
## ¿Ya está terminado el proyecto?
No. El proyecto todavía no ha alcanzado su máximo potencial—¡y esto es dicho de manera optimista! Se pretende crear diferentes maneras de evaluar contenidos a través de la ludificación, junto con funcionalidades que hagan más amena la experiencia, como foros, diferentes maneras de instruir con módulos, etc.

Más información, pronto.
