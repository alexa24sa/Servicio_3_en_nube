// Archivo JavaScript principal de la PWA
console.log('PWA cargada correctamente ✅');

// Detectar si la app está instalada
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  console.log('PWA lista para instalar');
  
  // Guardar el evento para mostrarlo después
  let deferredPrompt = e;
  
  // Crear botón de instalación (opcional)
  const installButton = document.createElement('button');
  installButton.textContent = 'Instalar PWA';
  installButton.style.cssText = 'position: fixed; bottom: 20px; right: 20px; padding: 10px 20px; background: #2196f3; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;';
  
  installButton.addEventListener('click', async () => {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Usuario ${outcome === 'accepted' ? 'aceptó' : 'rechazó'} la instalación`);
    deferredPrompt = null;
    installButton.remove();
  });
  
  document.body.appendChild(installButton);
});

// Evento cuando la PWA se instala
window.addEventListener('appinstalled', () => {
  console.log('PWA instalada exitosamente 🎉');
});

// Detectar si está corriendo como PWA instalada
if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log('Corriendo como PWA instalada 📱');
}
