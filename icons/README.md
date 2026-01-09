# Iconos Necesarios

Esta carpeta debe contener los siguientes archivos:

- **icon-192.png** (192x192 píxeles)
- **icon-512.png** (512x512 píxeles)

## Cómo crear los iconos:

### Opción 1: Usar un generador online
1. Ve a https://www.pwabuilder.com/ o https://realfavicongenerator.net/
2. Sube una imagen (mínimo 512x512px)
3. Genera los iconos en los tamaños necesarios

### Opción 2: Crear manualmente
1. Crea una imagen cuadrada de 512x512px
2. Redimensiona a 192x192px para el icono pequeño
3. Guarda ambas como PNG

### Opción 3: Usar ImageMagick (si lo tienes instalado)
```bash
# Crear un icono simple con fondo
magick -size 512x512 xc:#6366f1 -pointsize 200 -fill white -gravity center -annotate +0+0 "PWA" icon-512.png
magick icon-512.png -resize 192x192 icon-192.png
```

## Nota Temporal
Si necesitas desplegar rápidamente sin iconos personalizados, puedes usar iconos genéricos temporales.
Los navegadores mostrarán un ícono por defecto si faltan, pero es recomendable agregarlos.
