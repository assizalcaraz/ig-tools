<script>
  import '../shared-styles.css';
  
  export let title = 'Instagram Tools';
  export let showHeader = true;
  export let showSidebar = false;
  export let sidebarItems = [];
</script>

<svelte:head>
  <style>
    /* Aplicar estilos globales al contenido del slot */
    :global(*) {
      box-sizing: border-box;
    }
    
    :global(html) {
      font-family: var(--font-family);
      line-height: 1.6;
      color: var(--text-primary);
      background-color: var(--bg-primary);
    }
    
    :global(body) {
      margin: 0;
      padding: 0;
      font-size: var(--font-size-base);
      background-color: var(--bg-primary);
      color: var(--text-primary);
      min-height: 100vh;
    }
    
    :global(input), :global(textarea), :global(select) {
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      padding: var(--spacing-sm) var(--spacing-md);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      background-color: var(--surface-color);
      color: var(--text-primary);
      transition: border-color var(--transition-fast);
    }
    
    :global(input:focus), :global(textarea:focus), :global(select:focus) {
      border-color: var(--primary-color);
      outline: none;
    }
    
    :global(button) {
      font-family: inherit;
      cursor: pointer;
      border: none;
      background: none;
      padding: 0;
      margin: 0;
      transition: all var(--transition-fast);
    }
    
    :global(.btn) {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) var(--spacing-lg);
      border: none;
      border-radius: var(--border-radius);
      font-weight: 500;
      cursor: pointer;
      transition: all var(--transition-normal);
      text-decoration: none;
      font-size: var(--font-size-sm);
    }
    
    :global(.btn-primary) {
      background-color: var(--primary-color);
      color: white;
    }
    
    :global(.btn-primary:hover) {
      background-color: var(--primary-hover);
    }
    
    :global(.btn-secondary) {
      background-color: transparent;
      color: var(--primary-color);
      border: 1px solid var(--primary-color);
    }
    
    :global(.btn-secondary:hover) {
      background-color: var(--primary-color);
      color: white;
    }
    
    :global(a) {
      color: var(--primary-color);
      text-decoration: none;
      transition: color var(--transition-fast);
    }
    
    :global(a:hover) {
      color: var(--primary-hover);
    }
    
    :global(.card) {
      background-color: var(--surface-color);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
      padding: var(--spacing-lg);
      margin-bottom: var(--spacing-md);
      border: 1px solid var(--border-light);
    }
    
    :global(.container) {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-md);
    }
    
    :global(.loading-spinner) {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 2px solid var(--border-color);
      border-radius: 50%;
      border-top-color: var(--primary-color);
      animation: spin 1s ease-in-out infinite;
    }
    
    :global(@keyframes spin) {
      to { transform: rotate(360deg); }
    }
    
    :global(.flex) {
      display: flex;
    }
    
    :global(.grid) {
      display: grid;
    }
    
    :global(.grid-cols-4) {
      grid-template-columns: repeat(4, 1fr);
    }
  </style>
</svelte:head>

<div class="base-layout">
  {#if showHeader}
    <header class="header">
      <div class="header-content">
        <h1 class="header-title">{title}</h1>
      </div>
    </header>
  {/if}
  
  <div class="layout-container">
    {#if showSidebar}
      <aside class="sidebar">
        <nav class="sidebar-nav">
          {#each sidebarItems as item}
            <a href={item.href} class="sidebar-link" class:active={item.active}>
              {#if item.icon}
                <svelte:component this={item.icon} size={20} />
              {/if}
              <span>{item.label}</span>
            </a>
          {/each}
        </nav>
      </aside>
    {/if}
    
    <main class="main-content">
      <slot />
    </main>
  </div>
</div>

<style>
  .base-layout {
    min-height: 100vh;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-family: var(--font-family);
  }
  
  .header {
    background-color: var(--surface-color);
    border-bottom: 1px solid var(--border-color);
    padding: var(--spacing-lg) 0;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-md);
  }
  
  .header-title {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
  }
  
  .layout-container {
    display: flex;
    min-height: calc(100vh - 80px);
  }
  
  .sidebar {
    width: 250px;
    background-color: var(--surface-color);
    border-right: 1px solid var(--border-color);
    padding: var(--spacing-lg);
    position: fixed;
    height: calc(100vh - 80px);
    overflow-y: auto;
  }
  
  .sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }
  
  .sidebar-link {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    color: var(--text-secondary);
    text-decoration: none;
    border-radius: var(--border-radius);
    transition: all var(--transition-normal);
    font-weight: 500;
  }
  
  .sidebar-link:hover {
    background-color: var(--surface-hover);
    color: var(--text-primary);
  }
  
  .sidebar-link.active {
    background-color: var(--primary-color);
    color: white;
  }
  
  .main-content {
    flex: 1;
    padding: var(--spacing-xl);
    background-color: var(--bg-primary);
  }
  
  .main-content:has(+ .sidebar) {
    margin-left: 250px;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .sidebar {
      width: 100%;
      height: auto;
      position: relative;
      border-right: none;
      border-bottom: 1px solid var(--border-color);
    }
    
    .main-content {
      margin-left: 0;
    }
    
    .layout-container {
      flex-direction: column;
    }
  }
</style> 