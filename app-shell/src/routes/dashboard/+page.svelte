<script>
	import { onMount } from 'svelte';
	import { Settings, RefreshCw } from 'lucide-svelte';

	let iframeUrl = 'http://dashboard:5173';
	let isLoading = true;
	let hasError = false;

	onMount(() => {
		checkDashboardStatus();
	});

	async function checkDashboardStatus() {
		try {
			const response = await fetch(iframeUrl);
			if (response.ok) {
				hasError = false;
			} else {
				hasError = true;
			}
		} catch (error) {
			hasError = true;
		} finally {
			isLoading = false;
		}
	}

	function reloadDashboard() {
		isLoading = true;
		hasError = false;
		checkDashboardStatus();
	}
</script>

<svelte:head>
	<title>Dashboard - Instagram Tools</title>
	<meta name="description" content="Dashboard de Instagram" />
</svelte:head>

<div class="dashboard-container">
	<div class="dashboard-header">
		<h1>Dashboard de Instagram</h1>
		<div class="dashboard-actions">
			<button class="action-button" on:click={reloadDashboard}>
				<RefreshCw size={16} />
				Recargar
			</button>
			<a href="{iframeUrl}" target="_blank" class="action-button">
				<Settings size={16} />
				Abrir en Nueva Pestaña
			</a>
		</div>
	</div>

	{#if isLoading}
		<div class="loading-container">
			<div class="loading-spinner"></div>
			<p>Conectando con el Dashboard...</p>
		</div>
	{:else if hasError}
		<div class="error-container">
			<h3>Error de Conexión</h3>
			<p>No se pudo conectar con el Dashboard. Asegúrate de que esté ejecutándose en el puerto 5174.</p>
			<button class="retry-button" on:click={reloadDashboard}>
				<RefreshCw size={16} />
				Reintentar
			</button>
		</div>
	{:else}
		<div class="iframe-container">
			<iframe 
				src="{iframeUrl}" 
				title="Dashboard de Instagram"
				class="dashboard-iframe"
				onload={() => isLoading = false}
			></iframe>
		</div>
	{/if}
</div>

<style>
	.dashboard-container {
		height: calc(100vh - 2rem);
		display: flex;
		flex-direction: column;
	}

	.dashboard-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-lg);
		padding-bottom: var(--spacing-md);
		border-bottom: 1px solid var(--border-color);
	}

	.dashboard-header h1 {
		margin: 0;
		font-size: var(--text-xl);
		color: var(--text-primary);
	}

	.dashboard-actions {
		display: flex;
		gap: var(--spacing-sm);
	}

	.action-button {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--surface-color);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius);
		color: var(--text-primary);
		text-decoration: none;
		font-size: var(--text-sm);
		cursor: pointer;
		transition: all var(--transition);
	}

	.action-button:hover {
		background: var(--bg-color);
		border-color: var(--primary-color);
	}

	.loading-container,
	.error-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: var(--spacing-xl);
	}

	.loading-spinner {
		width: 48px;
		height: 48px;
		border: 4px solid var(--border-color);
		border-top: 4px solid var(--primary-color);
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: var(--spacing-md);
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.error-container h3 {
		color: var(--error-color);
		margin-bottom: var(--spacing-md);
	}

	.error-container p {
		color: var(--text-secondary);
		margin-bottom: var(--spacing-lg);
		max-width: 400px;
	}

	.retry-button {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-md) var(--spacing-lg);
		background: var(--primary-color);
		color: white;
		border: none;
		border-radius: var(--border-radius);
		cursor: pointer;
		font-weight: 500;
		transition: background var(--transition);
	}

	.retry-button:hover {
		background: var(--primary-color-dark);
	}

	.iframe-container {
		flex: 1;
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius);
		overflow: hidden;
	}

	.dashboard-iframe {
		width: 100%;
		height: 100%;
		border: none;
	}
</style> 