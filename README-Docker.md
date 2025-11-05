Docker / Compose — desarrollo para MiBolsillo

Este proyecto usa Expo (React Native). El soporte Docker incluido está pensado para ejecutar el servidor de desarrollo de Expo (modo web / túnel) en un contenedor.

Requisitos
- Docker y docker-compose instalados.

Arrancar el contenedor (modo dev)

```powershell
# desde la raíz del proyecto
docker-compose up --build
```

Notas
- El contenedor montará el directorio del proyecto como volumen para que los cambios locales se reflejen.
- Expo intentará abrir el tunnel para dispositivos físicos. Si prefieres trabajar en web, abre la URL que Expo muestra en la consola.
- Si necesitas ejecutar comandos npm/yarn dentro del contenedor:

```powershell
# abrir un shell dentro del contenedor
docker exec -it mibolsillo-expo sh
```

Limitaciones
- No se empaqueta una APK/IPA dentro de este Dockerfile. Está pensado solo para flujo de desarrollo (Metro / Expo).
- Para builds nativos o CI/CD se recomendaría crear pipelines específicas y usar `eas` o un builder dedicado.
