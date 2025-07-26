<script>
  import InstagramScraper from '$lib/components/InstagramScraper.svelte';
</script>

<InstagramScraper />

<style>
  .scraper-page {
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