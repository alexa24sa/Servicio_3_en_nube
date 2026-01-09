# Guía de Despliegue de PWA en la Nube

Esta guía te ayudará a desplegar tu PWA en Google Cloud, AWS y Azure.

---

## 🔥 GOOGLE CLOUD (Firebase Hosting)

### Archivos necesarios:
- `firebase.json` ✅
- `.firebaserc` ✅

### Paso a paso:

1. **Instalar Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Iniciar sesión en Firebase**
   ```bash
   firebase login
   ```

3. **Crear un proyecto en Firebase Console**
   - Ve a https://console.firebase.google.com/
   - Crea un nuevo proyecto
   - Copia el ID del proyecto

4. **Configurar el proyecto**
   - Edita el archivo `.firebaserc`
   - Reemplaza `"tu-proyecto-firebase"` con tu ID de proyecto real

5. **Desplegar**
   ```bash
   firebase deploy
   ```

6. **Tu PWA estará disponible en:**
   ```
   https://tu-proyecto-firebase.web.app
   ```

---

## 🐳 GOOGLE CLOUD (Cloud Run) - RECOMENDADO

### Archivos necesarios:
- `Dockerfile` ✅
- `nginx.conf` ✅
- `.gcloudignore` ✅
- `.dockerignore` ✅

### Paso a paso:

1. **Instalar Google Cloud SDK**
   - Descarga desde: https://cloud.google.com/sdk/docs/install

2. **Iniciar sesión**
   ```bash
   gcloud auth login
   ```

3. **Crear/Seleccionar proyecto**
   ```bash
   gcloud projects create mi-pwa-proyecto --name="Mi PWA"
   gcloud config set project mi-pwa-proyecto
   ```

4. **Habilitar APIs necesarias**
   ```bash
   gcloud services enable cloudbuild.googleapis.com run.googleapis.com
   ```

5. **Construir y desplegar desde el repositorio**
   ```bash
   gcloud run deploy mi-pwa \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

   **O construir localmente primero:**
   ```bash
   # Construir la imagen
   gcloud builds submit --tag gcr.io/mi-pwa-proyecto/mi-pwa
   
   # Desplegar
   gcloud run deploy mi-pwa \
     --image gcr.io/mi-pwa-proyecto/mi-pwa \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

6. **Tu PWA estará disponible en:**
   ```
   https://mi-pwa-xxxxx-uc.a.run.app
   ```

### Ventajas de Cloud Run:
- ✅ Escala automáticamente a 0 (sin costo cuando no hay tráfico)
- ✅ Paga solo por uso
- ✅ Despliegue directo desde repositorio
- ✅ HTTPS automático
- ✅ Sin servidor que administrar

---

## ☁️ GOOGLE CLOUD (App Engine)

### Archivos necesarios:
- `app.yaml` ✅

### Paso a paso:

1. **Instalar Google Cloud SDK**
   - Descarga desde: https://cloud.google.com/sdk/docs/install

2. **Iniciar sesión**
   ```bash
   gcloud auth login
   ```

3. **Crear un proyecto en GCP**
   ```bash
   gcloud projects create tu-proyecto-id --name="Mi PWA"
   gcloud config set project tu-proyecto-id
   ```

4. **Habilitar App Engine**
   ```bash
   gcloud app create --region=us-central
   ```

5. **Desplegar**
   ```bash
   gcloud app deploy app.yaml
   ```

6. **Ver tu aplicación**
   ```bash
   gcloud app browse
   ```

---

## 🚀 AWS (Amplify)

### Archivos necesarios:
- `amplify.yml` ✅

### Paso a paso:

1. **Crear cuenta en AWS**
   - Ve a https://aws.amazon.com/

2. **Subir tu código a GitHub**
   - Crea un repositorio en GitHub
   - Sube todos los archivos de tu PWA

3. **Ir a AWS Amplify Console**
   - https://console.aws.amazon.com/amplify/

4. **Conectar repositorio**
   - Clic en "New app" > "Host web app"
   - Selecciona GitHub
   - Autoriza AWS Amplify
   - Selecciona tu repositorio

5. **Configurar build**
   - AWS detectará automáticamente `amplify.yml`
   - Revisa la configuración
   - Clic en "Save and deploy"

6. **Tu PWA estará disponible en:**
   ```
   https://main.xxxxx.amplifyapp.com
   ```

---

## 🔧 AWS (Elastic Beanstalk)

### Archivos necesarios:
- `buildspec.yml` ✅
- `.ebextensions/https-redirect.config` ✅

### Paso a paso:

1. **Instalar AWS CLI**
   ```bash
   pip install awscli
   ```

2. **Configurar credenciales**
   ```bash
   aws configure
   ```

3. **Instalar EB CLI**
   ```bash
   pip install awsebcli
   ```

4. **Inicializar Elastic Beanstalk**
   ```bash
   eb init -p "64bit Amazon Linux 2023 v4.0.0 running Nginx" mi-pwa
   ```

5. **Crear ambiente**
   ```bash
   eb create mi-pwa-env
   ```

6. **Desplegar**
   ```bash
   eb deploy
   ```

7. **Abrir en navegador**
   ```bash
   eb open
   ```

---

## 🔷 AZURE (Static Web Apps)

### Archivos necesarios:
- `staticwebapp.config.json` ✅

### Paso a paso:

1. **Crear cuenta en Azure**
   - Ve a https://portal.azure.com/

2. **Subir tu código a GitHub**
   - Si aún no lo has hecho, sube tu PWA a GitHub

3. **Crear Static Web App**
   - En Azure Portal, busca "Static Web Apps"
   - Clic en "Create"
   - Selecciona tu suscripción
   - Crea un nuevo grupo de recursos
   - Nombre: `mi-pwa-rg`
   - Región: Elige la más cercana

4. **Conectar con GitHub**
   - Sign in con GitHub
   - Selecciona tu repositorio
   - Branch: `main`
   - Build Presets: "Custom"
   - App location: `/`
   - Output location: `/`

5. **Desplegar**
   - Azure creará automáticamente un GitHub Action
   - El despliegue se ejecutará automáticamente
   - Espera unos minutos

6. **Tu PWA estará disponible en:**
   ```
   https://xxx.azurestaticapps.net
   ```

---

## 📝 Notas Importantes

### Para todas las plataformas:

1. **Asegúrate de tener el archivo `app.js`**
   - Tu `index.html` hace referencia a él
   - Créalo si no existe:
   ```javascript
   console.log('PWA cargada correctamente');
   ```

2. **Verifica los iconos**
   - Crea la carpeta `icons/`
   - Agrega `icon-192.png` e `icon-512.png`

3. **HTTPS es obligatorio**
   - Todas las plataformas ofrecen HTTPS automáticamente
   - Las PWA requieren HTTPS para funcionar

4. **Service Worker**
   - El archivo `sw.js` debe servirse sin caché
   - Todas las configuraciones ya lo contemplan

---

## ⚙️ Estructura de Archivos Final

```
mi-pwa/
├── index.html                    # Tu archivo principal
├── manifest.json                 # Manifiesto PWA
├── sw.js                         # Service Worker
├── app.js                        # JavaScript de la app
├── icons/                        # Carpeta de iconos
│   ├── icon-192.png
│   └── icon-512.png
├── firebase.json                 # Config Firebase ✅
├── .firebaserc                   # Config Firebase ✅
├── app.yaml                      # Config Google App Engine ✅
├── staticwebapp.config.json      # Config Azure ✅
├── buildspec.yml                 # Config AWS CodeBuild ✅
├── amplify.yml                   # Config AWS Amplify ✅
└── .ebextensions/                # Config AWS Elastic Beanstalk ✅
    └── https-redirect.config
```

---

## 🎯 Recomendaciones

1. **Firebase Hosting** es la opción más sencilla para principiantes
2. **AWS Amplify** es excelente si usas GitHub
3. **Azure Static Web Apps** ofrece buena integración con GitHub Actions

---

## ❓ Problemas Comunes

### Error: "Service Worker no se registra"
- Verifica que uses HTTPS
- Comprueba la consola del navegador

### Error: "manifest.json no encontrado"
- Verifica la ruta en `index.html`
- Asegúrate de que el archivo existe

### Error: "Iconos no se muestran"
- Verifica que existan en la carpeta `icons/`
- Comprueba los tamaños (192x192 y 512x512)

---

¡Éxito con tu despliegue! 🚀
