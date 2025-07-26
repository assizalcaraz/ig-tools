<script>
  import '../app.css';
  import { Home, BarChart3, Scissors, Settings } from 'lucide-svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import ThemeManager from '$lib/components/ThemeManager.svelte';
  
  const sidebarItems = [
    { href: '/', label: 'Inicio', icon: Home },
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/scraper', label: 'Scraper', icon: Scissors },
    { href: '/settings', label: 'Configuración', icon: Settings }
  ];
</script>

<ThemeManager />

<div class="app-shell">
  <header class="shell-header">
    <div class="container">
      <h1>Instagram Tools</h1>
      <ThemeToggle />
    </div>
  </header>
  
  <div class="shell-content">
    <aside class="shell-sidebar">
      <nav>
        {#each sidebarItems as item}
          <a href={item.href} class="sidebar-link">
            <svelte:component this={item.icon} size={20} />
            <span>{item.label}</span>
          </a>
        {/each}
      </nav>
    </aside>
    
    <main class="shell-main">
      <slot />
    </main>
  </div>
</div>

<style>
  .app-shell {
    min-height: 100vh;
    background-color: var(--bg-primary);
    color: var(--text-primary);
  }

  .shell-header {
    background-color: var(--surface-color);
    border-bottom: 1px solid var(--border-color);
    padding: var(--spacing-lg) 0;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .shell-content {
    display: flex;
    min-height: calc(100vh - 80px);
  }

  .shell-sidebar {
    width: 250px;
    background-color: var(--surface-color);
    border-right: 1px solid var(--border-color);
    padding: var(--spacing-lg);
    position: fixed;
    height: calc(100vh - 80px);
    overflow-y: auto;
  }

  .shell-main {
    flex: 1;
    margin-left: 250px;
    padding: var(--spacing-xl);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-md);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  h1 {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
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
    margin-bottom: var(--spacing-xs);
  }
  
  .sidebar-link:hover {
    background-color: var(--surface-hover);
    color: var(--text-primary);
  }
  
  .sidebar-link.active {
    background-color: var(--primary-color);
    color: white;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .shell-sidebar {
      width: 100%;
      height: auto;
      position: relative;
      border-right: none;
      border-bottom: 1px solid var(--border-color);
    }
    
    .shell-main {
      margin-left: 0;
    }
    
    .shell-content {
      flex-direction: column;
    }
  }
</style> 