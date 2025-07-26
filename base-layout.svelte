<script>
  import { stylesConfig } from './styles-config.js';
  import './shared-styles.css';
  
  export let title = 'Instagram Tools';
  export let showHeader = true;
  export let showSidebar = false;
  export let sidebarItems = [];
  
  // Generar variables CSS dinámicamente
  let cssVariables = '';
  
  $: {
    cssVariables = `
      :root {
        --primary-color: ${stylesConfig.colors.primary};
        --primary-hover: ${stylesConfig.colors.primaryHover};
        --primary-dark: ${stylesConfig.colors.primaryDark};
        --secondary-color: ${stylesConfig.colors.secondary};
        --accent-color: ${stylesConfig.colors.accent};
        
        --text-primary: ${stylesConfig.colors.textPrimary};
        --text-secondary: ${stylesConfig.colors.textSecondary};
        --text-muted: ${stylesConfig.colors.textMuted};
        
        --bg-primary: ${stylesConfig.colors.bgPrimary};
        --bg-secondary: ${stylesConfig.colors.bgSecondary};
        --bg-tertiary: ${stylesConfig.colors.bgTertiary};
        
        --surface-color: ${stylesConfig.colors.surface};
        --surface-secondary: ${stylesConfig.colors.surfaceSecondary};
        --surface-hover: ${stylesConfig.colors.surfaceHover};
        
        --border-color: ${stylesConfig.colors.border};
        --border-light: ${stylesConfig.colors.borderLight};
        
        --success-color: ${stylesConfig.colors.success};
        --error-color: ${stylesConfig.colors.error};
        --warning-color: ${stylesConfig.colors.warning};
        --info-color: ${stylesConfig.colors.info};
        
        --success-bg: ${stylesConfig.colors.successBg};
        --error-bg: ${stylesConfig.colors.errorBg};
        --warning-bg: ${stylesConfig.colors.warningBg};
        --info-bg: ${stylesConfig.colors.infoBg};
        
        --spacing-xs: ${stylesConfig.spacing.xs};
        --spacing-sm: ${stylesConfig.spacing.sm};
        --spacing-md: ${stylesConfig.spacing.md};
        --spacing-lg: ${stylesConfig.spacing.lg};
        --spacing-xl: ${stylesConfig.spacing.xl};
        --spacing-2xl: ${stylesConfig.spacing['2xl']};
        
        --font-family: ${stylesConfig.typography.fontFamily};
        --font-size-xs: ${stylesConfig.typography.fontSize.xs};
        --font-size-sm: ${stylesConfig.typography.fontSize.sm};
        --font-size-base: ${stylesConfig.typography.fontSize.base};
        --font-size-lg: ${stylesConfig.typography.fontSize.lg};
        --font-size-xl: ${stylesConfig.typography.fontSize.xl};
        --font-size-2xl: ${stylesConfig.typography.fontSize['2xl']};
        --font-size-3xl: ${stylesConfig.typography.fontSize['3xl']};
        
        --border-radius-sm: ${stylesConfig.borderRadius.sm};
        --border-radius: ${stylesConfig.borderRadius.base};
        --border-radius-lg: ${stylesConfig.borderRadius.lg};
        
        --shadow: ${stylesConfig.shadows.sm};
        --shadow-md: ${stylesConfig.shadows.md};
        --shadow-lg: ${stylesConfig.shadows.lg};
        
        --transition-fast: ${stylesConfig.transitions.fast};
        --transition-normal: ${stylesConfig.transitions.normal};
        --transition-slow: ${stylesConfig.transitions.slow};
      }
      
      @media (prefers-color-scheme: dark) {
        :root {
          --text-primary: #ffffff;
          --text-secondary: #a8a8a8;
          --text-muted: #737373;
          
          --bg-primary: #000000;
          --bg-secondary: #121212;
          --bg-tertiary: #1a1a1a;
          
          --surface-color: #1a1a1a;
          --surface-secondary: #262626;
          --surface-hover: #333333;
          
          --border-color: #333333;
          --border-light: #262626;
        }
      }
    `;
  }
</script>

<svelte:head>
  <style>{cssVariables}</style>
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