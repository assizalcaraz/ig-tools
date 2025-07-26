<script>
  import { Sun, Moon } from 'lucide-svelte';
  import { onMount } from 'svelte';
  
  let isDark = false;
  
  onMount(() => {
    // Cargar tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      isDark = true;
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  });
  
  function toggleTheme() {
    // Alternar estado interno
    isDark = !isDark;
    const theme = isDark ? 'dark' : 'light';

    // Aplicar tema al documento principal
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    // Persistir elección
    localStorage.setItem('theme', theme);

    // Actualizar parámetro ?theme en la URL
    const url = new URL(window.location.href);
    url.searchParams.set('theme', theme);
    window.history.replaceState({}, '', url);

    // Notificar inmediatamente a todos los iframes
    const frames = document.querySelectorAll('iframe');
    frames.forEach((iframe, index) => {
      try {
        iframe.contentWindow?.postMessage({ type: 'THEME_CHANGE', theme }, '*');
        iframe.contentWindow?.postMessage({ type: 'URL_CHANGE', url: url.href }, '*');
      } catch (e) {
        console.error('Error enviando mensajes a iframe', index, e);
      }
    });
  }
</script>

<button 
  class="theme-toggle" 
  on:click={toggleTheme}
  aria-label="Cambiar tema"
  title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
>
  {#if isDark}
    <Sun size={20} />
  {:else}
    <Moon size={20} />
  {/if}
</button>

<style>
  .theme-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--surface-color);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    cursor: pointer;
    transition: all var(--transition-normal);
    box-shadow: var(--shadow);
  }
  
  .theme-toggle:hover {
    background-color: var(--surface-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
  
  .theme-toggle:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
</style> 