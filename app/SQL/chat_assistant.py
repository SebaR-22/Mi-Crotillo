from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Configurar OpenAI (coloca tu API key en .env como OPENAI_API_KEY)
openai.api_key = os.getenv("OPENAI_API_KEY")

router = APIRouter()


class ChatMessage(BaseModel):
    message: str


SYSTEM_PROMPT = """Eres un asistente experto de MiBolsillo, una aplicación de gestión de finanzas personales.
Ayudas a los usuarios a navegar la app, explicar funciones, dar consejos básicos y ofrecer soporte.
Si el usuario requiere asistencia humana, sugiere contactar al supervisor: +54 9 294 436-4439.
Responde de forma clara, breve y en un tono amistoso."""


@router.post("/chat")
async def chat_with_assistant(message: ChatMessage):
    try:
        # Respuesta rápida para solicitudes de contacto/soporte
        contact_keywords = ["supervisor", "soporte", "ayuda", "contacto", "teléfono", "whatsapp", "número"]
        if any(keyword in message.message.lower() for keyword in contact_keywords):
            return {
                "response": (
                    "Puedes contactar al supervisor de MiBolsillo a través de WhatsApp:\n\n"
                    "📱 +54 9 294 436-4439\n\n"
                    "El supervisor podrá asistirte con problemas técnicos o consultas específicas."
                )
            }

        # Si no hay API key configurada, devolver una respuesta segura
        if not openai.api_key:
            return {"response": "El servicio de IA no está configurado (falta la API key). Puedes contactar al supervisor: +54 9 294 436-4439"}

        # Llamada a OpenAI
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": message.message}
            ],
            max_tokens=300,
            temperature=0.7
        )

        assistant_response = response.choices[0].message.content
        return {"response": assistant_response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))