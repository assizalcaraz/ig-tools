<script>
  import { BarChart3, Scissors } from 'lucide-svelte';
</script>

<div class="home-page">
  <div class="welcome-section">
    <h1>Bienvenido a Instagram Tools</h1>
    <p>Selecciona una herramienta para comenzar:</p>
  </div>
  
  <div class="tools-grid">
    <a href="/dashboard" class="tool-card">
      <div class="tool-icon">
        <BarChart3 size={48} />
      </div>
      <h3>Dashboard</h3>
      <p>Visualiza y analiza tus datos de Instagram</p>
    </a>
    
    <a href="/scraper" class="tool-card">
      <div class="tool-icon">
        <Scissors size={48} />
      </div>
      <h3>Scraper</h3>
      <p>Extrae datos de perfiles de Instagram</p>
    </a>
  </div>
</div>

<style>
  .home-page {
    padding: var(--spacing-xl);
    max-width: 800px;
    margin: 0 auto;
  }
  
  .welcome-section {
    text-align: center;
    margin-bottom: var(--spacing-2xl);
  }
  
  .welcome-section h1 {
    font-size: var(--font-size-3xl);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--spacing-md);
  }
  
  .welcome-section p {
    font-size: var(--font-size-lg);
    color: var(--text-secondary);
  }
  
  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-xl);
  }
  
  .tool-card {
    background-color: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-xl);
    text-decoration: none;
    color: inherit;
    transition: all var(--transition-normal);
    text-align: center;
  }
  
  .tool-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-color);
  }
  
  .tool-icon {
    color: var(--primary-color);
    margin-bottom: var(--spacing-lg);
  }
  
  .tool-card h3 {
    font-size: var(--font-size-xl);
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
  }
  
  .tool-card p {
    color: var(--text-secondary);
    line-height: 1.6;
  }
</style> 