<script>
	import { onMount } from 'svelte';
	import { scraperApi } from '$lib/services/scraperApi';
	import { 
		Play, 
		CheckCircle, 
		XCircle, 
		Clock, 
		RefreshCw
	} from 'lucide-svelte';

	let username = '';
	let scrapeType = 'followers';
	let isScraping = false;
	let scrapingResults = [];
	let serverStatus = false;
	let error = '';

	onMount(async () => {
		await checkServerStatus();
		await loadScrapingHistory();
	});

	async function checkServerStatus() {
		try {
			serverStatus = await scraperApi.healthCheck();
		} catch (err) {
			console.error('Error checking server status:', err);
			serverStatus = false;
		}
	}

	async function loadScrapingHistory() {
		try {
			scrapingResults = await scraperApi.getAllScrapings();
		} catch (err) {
			console.error('Error loading scraping history:', err);
			error = 'Error al cargar el historial de scraping';
		}
	}

	async function startScraping() {
		if (!username.trim()) {
			error = 'Por favor ingresa un nombre de usuario';
			return;
		}

		try {
			isScraping = true;
			error = '';

			const request = {
				username: username.trim(),
				scrape_type: scrapeType
			};

			const result = await scraperApi.startScraping(request);
			console.log('Scraping iniciado:', result);

			// Recargar historial
			await loadScrapingHistory();

		} catch (err) {
			console.error('Error starting scraping:', err);
			error = 'Error al iniciar el scraping';
		} finally {
			isScraping = false;
		}
	}

	function getStatusIcon(status) {
		switch (status) {
			case 'completed':
				return CheckCircle;
			case 'failed':
				return XCircle;
			case 'pending':
				return Clock;
			default:
				return Clock;
		}
	}

	function getStatusColor(status) {
		switch (status) {
			case 'completed':
				return 'var(--success-color)';
			case 'failed':
				return 'var(--error-color)';
			case 'pending':
				return 'var(--warning-color)';
			default:
				return 'var(--text-muted)';
		}
	}

	function formatDate(dateString) {
		return new Date(dateString).toLocaleString('es-ES');
	}
</script>

<div class="scraper-integration">
	<div class="header">
		<h2>Instagram Scraper</h2>
		<div class="server-status" class:online={serverStatus}>
			<div class="status-indicator"></div>
			<span>{serverStatus ? 'Conectado' : 'Desconectado'}</span>
		</div>
	</div>

	{#if error}
		<div class="error-message">
			<XCircle size={16} />
			{error}
		</div>
	{/if}

	<div class="scraping-form">
		<div class="form-group">
			<label for="username">Usuario de Instagram:</label>
			<input 
				id="username"
				type="text" 
				bind:value={username} 
				placeholder="ej: instagram"
				disabled={isScraping}
			/>
		</div>

		<div class="form-group">
			<label for="scrape-type">Tipo de scraping:</label>
			<select id="scrape-type" bind:value={scrapeType} disabled={isScraping}>
				<option value="followers">Seguidores</option>
				<option value="following">Siguiendo</option>
				<option value="posts">Posts</option>
				<option value="all">Todo</option>
			</select>
		</div>

		<button 
			class="start-button" 
			on:click={startScraping}
			disabled={isScraping || !serverStatus}
		>
			{#if isScraping}
				<RefreshCw size={16} class="spinning" />
				Iniciando...
			{:else}
				<Play size={16} />
				Iniciar Scraping
			{/if}
		</button>
	</div>

	<div class="scraping-history">
		<h3>Historial de Scraping</h3>
		{#if scrapingResults.length === 0}
			<p class="no-results">No hay scraping recientes</p>
		{:else}
			<div class="results-list">
				{#each scrapingResults as result}
					<div class="result-item">
						<div class="result-header">
							<div class="result-info">
								<h4>@{result.username}</h4>
								<p class="result-type">{result.scrape_type}</p>
							</div>
							<div class="result-status" style="color: {getStatusColor(result.status)}">
								<svelte:component this={getStatusIcon(result.status)} size={20} />
								<span>{result.status}</span>
							</div>
						</div>
						<div class="result-details">
							<p>Creado: {formatDate(result.created_at)}</p>
							<p>Actualizado: {formatDate(result.updated_at)}</p>
							{#if result.error}
								<p class="error">Error: {result.error}</p>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.scraper-integration {
		background: var(--surface-color);
		border-radius: var(--border-radius);
		padding: var(--spacing-lg);
		box-shadow: var(--shadow-sm);
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-lg);
	}

	.header h2 {
		margin: 0;
		color: var(--text-primary);
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.server-status {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		font-size: var(--text-sm);
	}

	.status-indicator {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--error-color);
	}

	.server-status.online .status-indicator {
		background: var(--success-color);
	}

	.error-message {
		background: var(--error-bg);
		color: var(--error-color);
		padding: var(--spacing-md);
		border-radius: var(--border-radius);
		margin-bottom: var(--spacing-lg);
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.scraping-form {
		display: grid;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-xl);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.form-group label {
		font-weight: 500;
		color: var(--text-primary);
	}

	.form-group input,
	.form-group select {
		padding: var(--spacing-sm);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius);
		background: var(--bg-color);
		color: var(--text-primary);
		font-size: var(--text-base);
	}

	.form-group input:focus,
	.form-group select:focus {
		outline: none;
		border-color: var(--primary-color);
		box-shadow: 0 0 0 2px var(--primary-color-alpha);
	}

	.start-button {
		background: var(--primary-color);
		color: white;
		border: none;
		padding: var(--spacing-md) var(--spacing-lg);
		border-radius: var(--border-radius);
		font-size: var(--text-base);
		font-weight: 500;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
		transition: all var(--transition);
	}

	.start-button:hover:not(:disabled) {
		background: var(--primary-color-dark);
		transform: translateY(-1px);
	}

	.start-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.spinning {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	.scraping-history h3 {
		margin: 0 0 var(--spacing-md) 0;
		color: var(--text-primary);
	}

	.no-results {
		color: var(--text-muted);
		text-align: center;
		padding: var(--spacing-xl);
	}

	.results-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.result-item {
		background: var(--bg-color);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius);
		padding: var(--spacing-md);
	}

	.result-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--spacing-sm);
	}

	.result-info h4 {
		margin: 0;
		color: var(--text-primary);
	}

	.result-type {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--text-muted);
		text-transform: capitalize;
	}

	.result-status {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		font-size: var(--text-sm);
		font-weight: 500;
	}

	.result-details {
		font-size: var(--text-sm);
		color: var(--text-muted);
	}

	.result-details p {
		margin: var(--spacing-xs) 0;
	}

	.result-details .error {
		color: var(--error-color);
	}
</style> 