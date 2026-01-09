// Sistema de descarga simulada
let currentDownload = null;
let downloadInterval = null;

// Iconos para cada tipo de archivo
const fileIcons = {
  'pdf': '📄',
  'png': '🖼️',
  'jpg': '🖼️',
  'mp4': '🎥',
  'zip': '📦',
  'doc': '📝',
  'xls': '📊'
};

// Función para obtener el icono según la extensión
function getFileIcon(filename) {
  const extension = filename.split('.').pop();
  return fileIcons[extension] || '📁';
}

// Función para formatear bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 MB';
  const mb = bytes / 1024;
  return mb.toFixed(2) + ' MB';
}

// Función para formatear tiempo
function formatTime(seconds) {
  if (seconds < 60) return seconds + 's';
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return minutes + 'm ' + secs + 's';
}

// Función para iniciar la descarga simulada
function startDownload(filename, sizeKB) {
  // Obtener elementos del DOM
  const modal = document.getElementById('downloadModal');
  const modalFileName = document.getElementById('modalFileName');
  const modalFileIcon = document.getElementById('modalFileIcon');
  const progressFill = document.getElementById('progressFill');
  const progressPercent = document.getElementById('progressPercent');
  const progressSize = document.getElementById('progressSize');
  const downloadSpeed = document.getElementById('downloadSpeed');
  const timeRemaining = document.getElementById('timeRemaining');
  const downloadStatus = document.getElementById('downloadStatus');

  // Configurar modal
  modalFileName.textContent = filename;
  modalFileIcon.textContent = getFileIcon(filename);
  
  // Mostrar modal con animación
  modal.classList.add('active');
  
  // Inicializar valores
  let progress = 0;
  const totalSize = sizeKB / 1024; // Convertir a MB
  let downloaded = 0;
  const speed = (Math.random() * 3 + 2).toFixed(2); // Velocidad aleatoria entre 2-5 MB/s
  const totalTime = Math.ceil(totalSize / speed);
  let elapsed = 0;

  // Actualizar estado inicial
  progressFill.style.width = '0%';
  progressPercent.textContent = '0%';
  progressSize.textContent = `0 MB / ${totalSize.toFixed(2)} MB`;
  downloadSpeed.textContent = speed + ' MB/s';
  timeRemaining.textContent = formatTime(totalTime);
  downloadStatus.textContent = 'Descargando...';
  downloadStatus.style.color = 'var(--primary)';

  // Limpiar intervalo anterior si existe
  if (downloadInterval) {
    clearInterval(downloadInterval);
  }

  // Simular descarga
  currentDownload = {
    filename: filename,
    totalSize: totalSize,
    speed: parseFloat(speed),
    startTime: Date.now()
  };

  downloadInterval = setInterval(() => {
    elapsed++;
    progress = (elapsed / totalTime) * 100;
    downloaded = (progress / 100) * totalSize;

    // Actualizar UI
    progressFill.style.width = progress + '%';
    progressPercent.textContent = Math.floor(progress) + '%';
    progressSize.textContent = `${downloaded.toFixed(2)} MB / ${totalSize.toFixed(2)} MB`;
    
    const remaining = totalTime - elapsed;
    timeRemaining.textContent = remaining > 0 ? formatTime(remaining) : '0s';

    // Simular variación de velocidad
    if (Math.random() > 0.8) {
      const newSpeed = (parseFloat(speed) + (Math.random() - 0.5)).toFixed(2);
      downloadSpeed.textContent = newSpeed + ' MB/s';
    }

    // Completar descarga
    if (progress >= 100) {
      clearInterval(downloadInterval);
      progressFill.style.width = '100%';
      progressPercent.textContent = '100%';
      progressSize.textContent = `${totalSize.toFixed(2)} MB / ${totalSize.toFixed(2)} MB`;
      timeRemaining.textContent = '0s';
      downloadStatus.textContent = '✓ Completado';
      downloadStatus.style.color = 'var(--success)';
      
      // Mostrar notificación
      showNotification('Descarga completada', `${filename} se ha descargado correctamente`);
      
      // Cerrar modal automáticamente después de 2 segundos
      setTimeout(() => {
        closeModal();
      }, 2000);
    }
  }, 1000);
}

// Función para cancelar descarga
function cancelDownload() {
  if (downloadInterval) {
    clearInterval(downloadInterval);
    downloadInterval = null;
  }
  
  const downloadStatus = document.getElementById('downloadStatus');
  downloadStatus.textContent = '✕ Cancelado';
  downloadStatus.style.color = 'var(--danger)';
  
  showNotification('Descarga cancelada', 'La descarga ha sido cancelada');
  
  setTimeout(() => {
    closeModal();
  }, 1000);
}

// Función para cerrar modal
function closeModal() {
  const modal = document.getElementById('downloadModal');
  modal.classList.remove('active');
  
  if (downloadInterval) {
    clearInterval(downloadInterval);
    downloadInterval = null;
  }
  
  currentDownload = null;
}

// Función para mostrar notificaciones
function showNotification(title, body) {
  // Verificar si las notificaciones están soportadas
  if (!('Notification' in window)) {
    console.log('Las notificaciones no están soportadas');
    return;
  }

  // Pedir permiso si no lo tenemos
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body: body,
      icon: 'icons/icon-192.png',
      badge: 'icons/icon-192.png'
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification(title, {
          body: body,
          icon: 'icons/icon-192.png',
          badge: 'icons/icon-192.png'
        });
      }
    });
  }
}

// Agregar efectos a las tarjetas de cloud
document.addEventListener('DOMContentLoaded', () => {
  const cloudCards = document.querySelectorAll('.cloud-card');
  
  cloudCards.forEach(card => {
    card.addEventListener('click', () => {
      const cloudType = card.getAttribute('data-cloud');
      const cloudNames = {
        'gcloud': 'Google Cloud',
        'aws': 'AWS',
        'azure': 'Azure'
      };
      
      showNotification(
        `${cloudNames[cloudType]} seleccionado`,
        `Esta PWA está optimizada para ${cloudNames[cloudType]}`
      );
      
      // Efecto de selección
      cloudCards.forEach(c => c.style.transform = 'scale(1)');
      card.style.transform = 'scale(1.05)';
      setTimeout(() => {
        card.style.transform = 'scale(1)';
      }, 300);
    });
  });

  // Cerrar modal al hacer clic fuera
  const modal = document.getElementById('downloadModal');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Solicitar permisos de notificación al cargar
  if ('Notification' in window && Notification.permission === 'default') {
    setTimeout(() => {
      Notification.requestPermission();
    }, 2000);
  }
});

// Prevenir el cierre accidental
window.addEventListener('beforeunload', (e) => {
  if (currentDownload && downloadInterval) {
    e.preventDefault();
    e.returnValue = 'Hay una descarga en progreso. ¿Estás seguro de que quieres salir?';
    return e.returnValue;
  }
});
