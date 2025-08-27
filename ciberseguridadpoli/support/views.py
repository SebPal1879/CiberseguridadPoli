from textwrap import dedent

from django.contrib.auth.models import User
from django.shortcuts import render

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Ticket

from ciberseguridadpoli.utils import Util

def create_email_content(provided_name,subject,recipient):
  return {
      "email_subject" : f"{provided_name.lower().capitalize()}, hemos recibido tu PQRS.",
      "email_body" : dedent(f"""
        Gracias por contactar a Ciberseguridad Poli a través de nuestro formulario en línea. Hemos recibido tu inquietud con asunto: {subject}.

        Pronto recibirás un correo de uno de nuestros agentes con más información, así que mantente al tanto de tu bandeja de entrada.

        Aclaración: esto no es un correo real ni estará siendo revisado por nadie.
      """),
      "to_email": recipient,
  }

class SupportRequest(APIView):
  def post(self,request):
    data = {
      "name": request.data.get("name"),
      "email": request.data.get("email"),
      "subject": request.data.get("subject"),
      "telephone_number": request.data.get("phone"),
      "message": request.data.get("message")
    }

    user = User.objects.filter(email=data["email"]).first()
    if user:
      data["user"] = user

    try:
      Ticket.objects.create(**data)
    except:
      return Response({"Mensaje" : "La creación del ticket falló"},status=status.HTTP_400_BAD_REQUEST)

    email_content = create_email_content(provided_name=data["name"],subject=data["subject"],recipient=data["email"])
    Util.send_email(email_content)
    return Response({"Mensaje" : "Se creó exitosamente el ticket"},status=status.HTTP_201_CREATED)





