# Dockerfile para desplegar la PWA en Google Cloud Run, GKE o App Engine Flexible
# Usa Nginx como servidor web ligero para servir archivos estáticos

# Etapa 1: Imagen base de Nginx
FROM nginx:alpine

# Información del mantenedor
LABEL maintainer="tu-email@example.com"
LABEL description="PWA Cloud Manager - Aplicación Web Progresiva"

# Eliminar la configuración predeterminada de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar todos los archivos de la PWA al directorio de Nginx
COPY index.html /usr/share/nginx/html/
COPY manifest.json /usr/share/nginx/html/
COPY sw.js /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/
COPY download.js /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY icons/ /usr/share/nginx/html/icons/

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 8080 (requerido por Cloud Run)
EXPOSE 8080

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
