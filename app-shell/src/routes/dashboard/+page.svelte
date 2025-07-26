<script>
  import { onMount } from 'svelte';
  
  let iframeUrl = 'http://localhost:5174?parent=app-shell';
  let loading = true;
  let error = false;
  
  onMount(() => {
    // Simular carga
    setTimeout(() => {
      loading = false;
    }, 1000);
  });
</script>

<div class="dashboard-page">
  {#if loading}
    <div class="loading">
      <div class="loading-spinner"></div>
      <p>Cargando Dashboard...</p>
    </div>
  {:else if error}
    <div class="error">
      <h3>Error de Conexión</h3>
      <p>No se pudo conectar con el Dashboard. Asegúrate de que esté ejecutándose.</p>
    </div>
  {:else}
    <iframe 
      src={iframeUrl} 
      class="iframe-container"
      title="Instagram Dashboard"
      on:load={() => loading = false}
      on:error={() => error = true}
    />
  {/if}
</div>

<style>
  .dashboard-page {
    height: 100%;
  }
  
  .loading, .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: var(--spacing-lg);
  }
  
  .loading p, .error p {
    color: var(--text-secondary);
    font-size: var(--font-size-lg);
  }
  
  .error h3 {
    color: var(--error-color);
    font-size: var(--font-size-xl);
    margin-bottom: var(--spacing-sm);
  }
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--border-color);
    border-radius: 50%;
    border-top-color: var(--primary-color);
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style> 