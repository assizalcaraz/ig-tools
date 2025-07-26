<script>
  import InstagramDashboard from '$lib/components/InstagramDashboard.svelte';
</script>

<InstagramDashboard />

<style>
  /* Ya no es necesario el contenedor de iframe ni loading */
  :global(body) {
    background-color: var(--bg-primary);
  }
</style> 