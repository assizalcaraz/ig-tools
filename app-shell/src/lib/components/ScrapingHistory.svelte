<script lang="ts">
	import { History, Download, Trash2, Calendar, User, Users, UserPlus, Image } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { instagramScraper } from '$lib/services/instagramScraper';

	let scrapingHistory = [];
	let selectedData = null;
	let isClient = false;

	onMount(() => {
		isClient = true;
		loadHistory();
	});

	function loadHistory() {
		if (typeof localStorage === 'undefined') return;
		scrapingHistory = [];
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key && key.startsWith('instagram_data_')) {
				try {
					const data = JSON.parse(localStorage.getItem(key) || '');
					if (data && data.username) {
						const date = key.split('_').slice(-1)[0];
						scrapingHistory.push({
							key,
							data,
							date
						});
					}
				} catch (error) {
					console.error('Error parsing localStorage item:', key);
				}
			}
		}
		// Ordenar por fecha más reciente
		scrapingHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	}

	function formatDate(dateString) {
		return new Date(dateString).toLocaleDateString('es-ES', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function downloadData(data) {
		if (typeof window === 'undefined') return;
		const dataStr = JSON.stringify(data, null, 2);
		const dataBlob = new Blob([dataStr], { type: 'application/json' });
		const url = URL.createObjectURL(dataBlob);
		
		const link = document.createElement('a');
		link.href = url;
		link.download = `instagram_data_${data.username}_${new Date().toISOString().split('T')[0]}.json`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	}

	function deleteData(key) {
		if (typeof localStorage === 'undefined') return;
		if (confirm('¿Estás seguro de que quieres eliminar estos datos?')) {
			localStorage.removeItem(key);
			loadHistory();
			if (selectedData && selectedData.username === key.split('_')[2]) {
				selectedData = null;
			}
		}
	}

	function clearAllHistory() {
		if (typeof localStorage === 'undefined') return;
		if (confirm('¿Estás seguro de que quieres eliminar todo el historial?')) {
			scrapingHistory.forEach(item => {
				localStorage.removeItem(item.key);
			});
			loadHistory();
			selectedData = null;
		}
	}

	function viewData(data) {
		selectedData = data;
	}
</script>

{#if isClient}
<div class="scraping-history">
	<header class="history-header">
		<h2>
			<History size={24} />
			Historial de Scraping
		</h2>
		{#if scrapingHistory.length > 0}
			<button class="clear-all-btn" on:click={clearAllHistory}>
				<Trash2 size={16} />
				Limpiar Todo
			</button>
		{/if}
	</header>

	{#if scrapingHistory.length === 0}
		<div class="empty-state">
			<History size={48} />
			<h3>No hay datos guardados</h3>
			<p>Los datos de scraping se guardarán automáticamente aquí</p>
		</div>
	{:else}
		<div class="history-content">
			<div class="history-list">
				<h3>Datos Guardados ({scrapingHistory.length})</h3>
				<div class="history-items">
					{#each scrapingHistory as item}
						<div class="history-item" class:selected={selectedData?.username === item.data.username}>
							<div class="item-header">
								<div class="item-info">
									<div class="username">
										<User size={16} />
										@{item.data.username}
									</div>
									<div class="date">
										<Calendar size={14} />
										{formatDate(item.date)}
									</div>
								</div>
								<div class="item-stats">
									<span class="stat">{item.data.followers.toLocaleString()} seguidores</span>
									<span class="stat">{item.data.posts} posts</span>
								</div>
							</div>
							<div class="item-actions">
								<button class="action-btn view-btn" on:click={() => viewData(item.data)}>
									Ver Datos
								</button>
								<button class="action-btn download-btn" on:click={() => downloadData(item.data)}>
									<Download size={14} />
								</button>
								<button class="action-btn delete-btn" on:click={() => deleteData(item.key)}>
									<Trash2 size={14} />
								</button>
							</div>
						</div>
					{/each}
				</div>
			</div>

			{#if selectedData}
				<div class="selected-data">
					<div class="data-header">
						<h3>Datos de @{selectedData.username}</h3>
						<button class="download-btn" on:click={() => selectedData && downloadData(selectedData)}>
							<Download size={16} />
							Descargar
						</button>
					</div>

					<div class="data-stats">
						<div class="stat-card">
							<Users size={20} />
							<div class="stat-info">
								<div class="stat-value">{selectedData.followers.toLocaleString()}</div>
								<div class="stat-label">Seguidores</div>
							</div>
						</div>
						<div class="stat-card">
							<UserPlus size={20} />
							<div class="stat-info">
								<div class="stat-value">{selectedData.following.toLocaleString()}</div>
								<div class="stat-label">Siguiendo</div>
							</div>
						</div>
						<div class="stat-card">
							<Image size={20} />
							<div class="stat-info">
								<div class="stat-value">{selectedData.posts.toLocaleString()}</div>
								<div class="stat-label">Posts</div>
							</div>
						</div>
					</div>

					<div class="data-posts">
						<h4>Posts ({selectedData.posts_data?.length || 0})</h4>
						<div class="posts-preview">
							{#each (selectedData.posts_data || []).slice(0, 5) as post}
								<div class="post-preview">
									<div class="post-header">
										<span class="post-id">#{post.id}</span>
										<span class="post-media">{post.media}</span>
									</div>
									<div class="post-text">{post.text.substring(0, 100)}...</div>
									<div class="post-metrics">
										<span>❤️ {post.likes.toLocaleString()}</span>
										<span>💬 {post.comments.toLocaleString()}</span>
										<span>🔖 {post.saved.toLocaleString()}</span>
									</div>
									
									<!-- Comentarios del post -->
									{#if post.comments_data && post.comments_data.length > 0}
										<div class="comments-preview">
											<div class="comments-header">
												<span>💬 {post.comments_data.length} comentarios</span>
											</div>
											<div class="comments-list">
												{#each post.comments_data.slice(0, 3) as comment}
													<div class="comment-preview">
														<span class="comment-user">@{comment.username}</span>
														<span class="comment-text">{comment.text.substring(0, 50)}...</span>
													</div>
												{/each}
												{#if post.comments_data.length > 3}
													<div class="more-comments">
														+{post.comments_data.length - 3} más
													</div>
												{/if}
											</div>
										</div>
									{/if}
								</div>
							{/each}
							{#if (selectedData.posts_data || []).length > 5}
								<div class="more-posts">
									+{(selectedData.posts_data || []).length - 5} posts más
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
{/if}

<style>
	.scraping-history {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.history-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 2rem;
	}

	.history-header h2 {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.clear-all-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: var(--error-color);
		color: white;
		border: none;
		border-radius: var(--border-radius);
		cursor: pointer;
		transition: background-color 0.2s ease;
		font-size: 0.875rem;
	}

	.clear-all-btn:hover {
		background: #d32f2f;
	}

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
		color: var(--text-secondary);
	}

	.empty-state h3 {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 1rem 0 0.5rem 0;
		color: var(--text-primary);
	}

	.history-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	.history-list h3 {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 1rem;
	}

	.history-items {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.history-item {
		background: var(--surface-color);
		border-radius: var(--border-radius);
		padding: 1rem;
		border: 2px solid transparent;
		transition: all 0.2s ease;
	}

	.history-item:hover {
		border-color: var(--primary-color);
	}

	.history-item.selected {
		border-color: var(--primary-color);
		background: var(--background-color);
	}

	.item-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
	}

	.item-info {
		flex: 1;
	}

	.username {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}

	.date {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.item-stats {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.25rem;
	}

	.stat {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.item-actions {
		display: flex;
		gap: 0.5rem;
	}

	.action-btn {
		padding: 0.5rem;
		border: 1px solid var(--border-color);
		background: transparent;
		border-radius: var(--border-radius);
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.view-btn {
		color: var(--primary-color);
		font-size: 0.875rem;
	}

	.view-btn:hover {
		background: var(--primary-color);
		color: white;
	}

	.download-btn {
		color: var(--success-color);
	}

	.download-btn:hover {
		background: var(--success-color);
		color: white;
	}

	.delete-btn {
		color: var(--error-color);
	}

	.delete-btn:hover {
		background: var(--error-color);
		color: white;
	}

	.selected-data {
		background: var(--surface-color);
		border-radius: var(--border-radius);
		padding: 1.5rem;
	}

	.data-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.5rem;
	}

	.data-header h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.data-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.stat-card {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem;
		background: var(--background-color);
		border-radius: var(--border-radius);
	}

	.stat-info {
		flex: 1;
	}

	.stat-value {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.stat-label {
		font-size: 0.75rem;
		color: var(--text-secondary);
		margin-top: 0.25rem;
	}

	.data-posts h4 {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 1rem;
	}

	.posts-preview {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.post-preview {
		background: var(--background-color);
		border-radius: var(--border-radius);
		padding: 1rem;
		border-left: 3px solid var(--primary-color);
	}

	.post-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.post-id {
		font-weight: 600;
		color: var(--text-primary);
		font-size: 0.875rem;
	}

	.post-media {
		font-size: 0.75rem;
		color: var(--text-secondary);
		text-transform: uppercase;
	}

	.post-text {
		font-size: 0.875rem;
		color: var(--text-primary);
		margin-bottom: 0.75rem;
		line-height: 1.4;
	}

	.post-metrics {
		display: flex;
		gap: 1rem;
		font-size: 0.75rem;
		color: var(--text-secondary);
	}

	.more-posts {
		text-align: center;
		padding: 1rem;
		color: var(--text-secondary);
		font-style: italic;
		background: var(--background-color);
		border-radius: var(--border-radius);
	}

	.comments-preview {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border-color);
	}

	.comments-header {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin-bottom: 0.5rem;
	}

	.comments-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.comment-preview {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: var(--text-primary);
	}

	.comment-user {
		font-weight: 600;
		color: var(--primary-color);
	}

	.comment-text {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.more-comments {
		text-align: center;
		padding: 0.5rem;
		color: var(--text-secondary);
		font-style: italic;
		font-size: 0.75rem;
	}

	@media (max-width: 768px) {
		.history-content {
			grid-template-columns: 1fr;
		}

		.item-header {
			flex-direction: column;
			gap: 0.5rem;
		}

		.item-stats {
			align-items: flex-start;
		}

		.data-header {
			flex-direction: column;
			gap: 1rem;
			align-items: flex-start;
		}
	}
</style> 