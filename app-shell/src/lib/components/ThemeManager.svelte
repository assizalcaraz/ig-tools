<script>
  import { onMount } from 'svelte';
  
  onMount(() => {
    // Función para sincronizar el tema con iframes usando postMessage
    function syncThemeToIframes() {
      const iframes = document.querySelectorAll('iframe');
      const theme = localStorage.getItem('theme') || 'light';
      const currentUrl = window.location.href;
      
      iframes.forEach(iframe => {
        try {
          // Enviar mensaje al iframe
          iframe.contentWindow.postMessage({
            type: 'THEME_CHANGE',
            theme: theme
          }, '*');

          // Enviar URL actual con el parámetro de tema
          iframe.contentWindow.postMessage({
            type: 'URL_CHANGE',
            url: currentUrl
          }, '*');
        } catch (e) {
          // Error de CORS - normal cuando el iframe no está cargado
        }
      });
    }
    
    // Escuchar cambios en localStorage
    window.addEventListener('storage', (e) => {
      if (e.key === 'theme') {
        const theme = e.newValue;
        if (theme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
        syncThemeToIframes();
      }
    });
    
    // Sincronizar tema inicial
    syncThemeToIframes();
    
    // Observar cambios en el DOM para detectar nuevos iframes
    const observer = new MutationObserver(() => {
      syncThemeToIframes();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => {
      observer.disconnect();
    };
  });
</script>

<!-- Este componente no renderiza nada, solo maneja la lógica --> 