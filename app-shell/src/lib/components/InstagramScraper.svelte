<script lang="ts">
	import { onMount } from 'svelte';
	import { Heart, MessageCircle, Bookmark, Share2, Play, Loader2, CheckCircle, XCircle } from 'lucide-svelte';
	import { apiService } from '$lib/services/apiService';

	let targetUsername = '';
	let isScraping = false;
	let scrapedData = null;
	let sessionId = null;
	let statusInterval = null;
	let errorMessage = '';

	// Opciones de scraping
	let scrapeOptions = {
		profileInfo: true,      // Información del perfil (followers, following, etc.)
		lastPost: true,         // Último post con likes y comentarios
		multiplePosts: false,   // Múltiples posts (deshabilitado por defecto)
		comments: true,         // Comentarios del último post
		likes: true             // Likes del último post
	};

	onMount(() => {
		// Cleanup al desmontar
		return () => {
			if (statusInterval) {
				clearInterval(statusInterval);
			}
		};
	});

	async function startScraping() {
		if (!targetUsername.trim()) {
			errorMessage = 'Por favor ingresa un username válido';
			return;
		}

		isScraping = true;
		errorMessage = '';
		scrapedData = null;

		try {
			const response = await apiService.scrapeProfile(targetUsername, scrapeOptions);
			sessionId = response.session_id;

			// Polling para verificar estado
			statusInterval = setInterval(async () => {
				try {
					const status = await apiService.getScrapingStatus(sessionId);
					
					if (status.status === 'completed') {
						clearInterval(statusInterval);
						isScraping = false;
						
						// Obtener datos finales
						const profileData = await apiService.getProfile(targetUsername);
						scrapedData = profileData;
					} else if (status.status === 'failed') {
						clearInterval(statusInterval);
						isScraping = false;
						errorMessage = status.error_message || 'Error durante el scraping';
					}
				} catch (err) {
					console.error('Error checking status:', err);
				}
			}, 2000);

		} catch (err) {
			isScraping = false;
			errorMessage = err instanceof Error ? err.message : String(err);
		}
	}

	function resetForm() {
		targetUsername = '';
		isScraping = false;
		scrapedData = null;
		sessionId = null;
		errorMessage = '';
		if (statusInterval) {
			clearInterval(statusInterval);
		}
	}

	function formatDate(dateStr) {
		try {
			return new Date(dateStr).toLocaleDateString('es-ES', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
		} catch {
			return dateStr;
		}
	}
</script>

	<div class="instagram-scraper">
		<div class="scraper-header">
			<h2>
				<Play size={24} />
				Instagram Scraper
			</h2>
			<p>Extrae información detallada de perfiles de Instagram</p>
		</div>

		<div class="input-section">
			<div class="input-group">
				<label for="username">Username de Instagram:</label>
				<input
					id="username"
					type="text"
					placeholder="@username"
					bind:value={targetUsername}
					disabled={isScraping}
				/>
			</div>

			<!-- Opciones de scraping -->
			<div class="scraping-options">
				<h4>Opciones de extracción:</h4>
				<div class="options-grid">
					<label class="option-item">
						<input type="checkbox" bind:checked={scrapeOptions.profileInfo} disabled={isScraping}>
						<span class="option-label">
							<CheckCircle size={16} />
							Información del perfil (followers, following, bio)
						</span>
					</label>
					
					<label class="option-item">
						<input type="checkbox" bind:checked={scrapeOptions.lastPost} disabled={isScraping}>
						<span class="option-label">
							<Heart size={16} />
							Último post con likes
						</span>
					</label>
					
					<label class="option-item">
						<input type="checkbox" bind:checked={scrapeOptions.comments} disabled={isScraping}>
						<span class="option-label">
							<MessageCircle size={16} />
							Primeros 3 comentarios
						</span>
					</label>
					
					<label class="option-item">
						<input type="checkbox" bind:checked={scrapeOptions.multiplePosts} disabled={isScraping}>
						<span class="option-label">
							<Bookmark size={16} />
							Múltiples posts (más lento)
						</span>
					</label>
				</div>
			</div>

			<button 
				class="scrape-btn" 
				on:click={startScraping} 
				disabled={isScraping || !targetUsername.trim()}
			>
				{#if isScraping}
					<Loader2 size={16} class="spinner" />
					Scrapeando...
				{:else}
					<Play size={16} />
					Iniciar Scraping
				{/if}
			</button>

			{#if errorMessage}
				<div class="error-message">
					<XCircle size={16} />
					{errorMessage}
				</div>
			{/if}
		</div>

		{#if scrapedData}
			<div class="results-section">
				<div class="profile-info">
					<h3>@{scrapedData.username}</h3>
					<div class="stats-grid">
						<div class="stat-card">
							<div class="stat-value">{scrapedData.followers.toLocaleString()}</div>
							<div class="stat-label">Seguidores</div>
						</div>
						<div class="stat-card">
							<div class="stat-value">{scrapedData.following.toLocaleString()}</div>
							<div class="stat-label">Siguiendo</div>
						</div>
						<div class="stat-card">
							<div class="stat-value">{scrapedData.posts.toLocaleString()}</div>
							<div class="stat-label">Posts</div>
						</div>
					</div>
					{#if scrapedData.bio}
						<div class="bio">
							<strong>Bio:</strong> {scrapedData.bio}
						</div>
					{/if}
				</div>

				<!-- Último post -->
				{#if scrapedData.posts_data && scrapedData.posts_data.length > 0}
					<div class="last-post-section">
						<h4>Último Post Analizado</h4>
						{#each scrapedData.posts_data.slice(0, 1) as post}
							<div class="post-card">
								<div class="post-header">
									<span class="post-id">#{post.id}</span>
									<span class="post-media-type">{post.media}</span>
								</div>
								
								{#if post.text}
									<div class="post-text">{post.text}</div>
								{/if}
								
								<div class="post-timestamp">
									{formatDate(post.timestamp)}
								</div>
								
								<div class="post-metrics">
									<div class="metric">
										<Heart size={14} />
										{post.likes.toLocaleString()} likes
									</div>
									<div class="metric">
										<MessageCircle size={14} />
										{post.comments.toLocaleString()} comentarios
									</div>
								</div>
								
								<!-- Comentarios del post -->
								{#if post.comments_data && post.comments_data.length > 0}
									<div class="comments-section">
										<h5>Primeros 3 Comentarios</h5>
										<div class="comments-list">
											{#each post.comments_data.slice(0, 3) as comment}
												<div class="comment-item">
													<div class="comment-header">
														<span class="comment-username">@{comment.username}</span>
														{#if comment.likes > 0}
															<span class="comment-likes">❤️ {comment.likes}</span>
														{/if}
													</div>
													<div class="comment-text">{comment.text}</div>
												</div>
											{/each}
										</div>
									</div>
								{/if}
								
								{#if post.url}
									<div class="post-link">
										<a href={post.url} target="_blank" rel="noopener noreferrer">
											Ver en Instagram
										</a>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				{/if}

				<!-- Botón de reset -->
				<div class="reset-section">
					<button class="reset-btn" on:click={resetForm}>
						Nuevo Scraping
					</button>
				</div>
			</div>
		{/if}
	</div>

<style>
	.instagram-scraper {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.scraper-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.scraper-header h2 {
		font-size: 2rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.scraper-header p {
		font-size: 1.125rem;
		color: var(--text-secondary);
	}

	.input-section {
		background: var(--surface-color);
		border-radius: var(--border-radius);
		box-shadow: var(--shadow);
		padding: 2rem;
		margin-bottom: 2rem;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.input-group label {
		font-weight: 600;
		color: var(--text-primary);
	}

	.input-group input {
		padding: 0.75rem;
		border: 2px solid var(--border-color);
		border-radius: var(--border-radius);
		font-size: 1rem;
		background: var(--surface-color);
		color: var(--text-primary);
		transition: border-color 0.2s ease;
		box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075);
	}

	.input-group input:focus {
		outline: none;
		border-color: var(--primary-color);
		box-shadow: 0 0 0 3px rgba(0, 149, 246, 0.1);
	}

	.input-group input::placeholder {
		color: var(--text-muted);
		opacity: 0.7;
	}

	.input-group input:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	/* Estilos para opciones de scraping */
	.scraping-options {
		margin: 1.5rem 0;
		padding: 1.5rem;
		background: var(--surface-secondary);
		border-radius: var(--border-radius);
		border: 1px solid var(--border-color);
	}

	.scraping-options h4 {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 1rem;
	}

	.options-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}

	.option-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem;
		background: var(--surface-color);
		border-radius: var(--border-radius);
		border: 1px solid var(--border-color);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.option-item:hover {
		background: var(--surface-hover);
		border-color: var(--primary-color);
	}

	.option-item input[type="checkbox"] {
		width: 1.25rem;
		height: 1.25rem;
		accent-color: var(--primary-color);
	}

	.option-item input[type="checkbox"]:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.option-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: var(--text-primary);
		font-weight: 500;
	}

	.option-label svg {
		color: var(--primary-color);
	}

	.scrape-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: 100%;
		padding: 1rem 2rem;
		background: var(--primary-color);
		color: white;
		border: none;
		border-radius: var(--border-radius);
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.2s ease;
		margin-top: 1rem;
	}

	.scrape-btn:hover:not(:disabled) {
		background: var(--primary-hover);
	}

	.scrape-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.spinner {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	.error-message {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem;
		background: var(--error-bg);
		color: var(--error-color);
		border-radius: var(--border-radius);
		margin-top: 1rem;
		font-size: 0.875rem;
	}

	.progress-section {
		background: var(--surface-color);
		border-radius: var(--border-radius);
		box-shadow: var(--shadow);
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.progress-bar {
		width: 100%;
		height: 8px;
		background: var(--border-color);
		border-radius: 4px;
		overflow: hidden;
		margin-bottom: 1rem;
	}

	.progress-fill {
		height: 100%;
		background: var(--primary-color);
		transition: width 0.3s ease;
	}

	.progress-text {
		text-align: center;
		color: var(--text-secondary);
		font-weight: 500;
	}

	.results-section {
		background: var(--surface-color);
		border-radius: var(--border-radius);
		box-shadow: var(--shadow);
		padding: 2rem;
		margin-top: 2rem;
	}

	.profile-info h3 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: 1.5rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.stat-card {
		background: var(--surface-secondary);
		padding: 1rem;
		border-radius: var(--border-radius);
		text-align: center;
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary-color);
		margin-bottom: 0.25rem;
	}

	.stat-label {
		font-size: 0.875rem;
		color: var(--text-secondary);
		font-weight: 500;
	}

	.posts-section {
		margin-bottom: 2rem;
	}

	.posts-section h4 {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 1rem;
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1rem;
	}

	.post-card {
		background: var(--surface-secondary);
		border-radius: var(--border-radius);
		padding: 1.5rem;
		border: 1px solid var(--border-color);
	}

	.post-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.post-id {
		font-size: 0.875rem;
		color: var(--text-secondary);
		font-weight: 500;
	}

	.post-media-type {
		font-size: 0.75rem;
		color: var(--primary-color);
		background: var(--primary-bg);
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		text-transform: uppercase;
		font-weight: 600;
	}

	.post-text {
		font-size: 0.875rem;
		color: var(--text-primary);
		line-height: 1.5;
		margin-bottom: 1rem;
	}

	.post-timestamp {
		font-size: 0.75rem;
		color: var(--text-secondary);
		margin-bottom: 1rem;
	}

	.post-metrics {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.metric {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.metric svg {
		color: var(--primary-color);
	}

	.post-link {
		text-align: center;
	}

	.post-link a {
		color: var(--primary-color);
		text-decoration: none;
		font-size: 0.875rem;
	}

	.post-link a:hover {
		text-decoration: underline;
	}

	/* Estilos para comentarios */
	.comments-section {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border-color);
	}

	.comments-section h5 {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.75rem;
	}

	.comments-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.comment-item {
		background: var(--surface-color);
		border-radius: var(--border-radius);
		padding: 0.75rem;
	}

	.comment-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.comment-username {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.comment-likes {
		font-size: 0.75rem;
		color: var(--text-secondary);
	}

	.comment-text {
		font-size: 0.875rem;
		color: var(--text-primary);
		line-height: 1.4;
	}

	.more-comments {
		font-size: 0.75rem;
		color: var(--text-secondary);
		text-align: center;
		padding: 0.5rem;
		font-style: italic;
	}

	.reset-section {
		margin-top: 2rem;
		text-align: center;
	}

	.reset-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background: var(--surface-secondary);
		color: var(--text-primary);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius);
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.reset-btn:hover {
		background: var(--surface-hover);
		border-color: var(--primary-color);
	}

	@media (max-width: 768px) {
		.input-wrapper {
			flex-direction: column;
		}

		.posts-grid {
			grid-template-columns: 1fr;
		}

		.results-header {
			flex-direction: column;
			gap: 1rem;
			align-items: flex-start;
		}

		.profile-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}
	}
</style> 