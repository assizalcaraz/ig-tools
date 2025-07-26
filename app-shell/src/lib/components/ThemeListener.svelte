<script>
  import { onMount } from 'svelte';
  
  onMount(() => {
    // Escuchar mensajes del app-shell
    window.addEventListener('message', (event) => {
      if (event.data.type === 'THEME_CHANGE') {
        const theme = event.data.theme;
        
        if (theme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
          localStorage.setItem('theme', 'light');
        }
      }
    });
    
    // También escuchar cambios en localStorage (por si acaso)
    window.addEventListener('storage', (e) => {
      if (e.key === 'theme') {
        const theme = e.newValue;
        if (theme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
      }
    });
  });
</script>

<!-- Este componente no renderiza nada, solo maneja la lógica --> 