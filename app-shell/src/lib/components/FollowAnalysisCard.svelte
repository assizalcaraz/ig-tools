<script>
	import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-svelte';

	export let title;
	export let count;
	export let icon;
	export let users = [];
	export let expanded = false;
	export let onToggle;
	export let getUserData;
	export let dataArray = [];
	export let cardType = 'mutual';

	// Usuarios a mostrar (limitados o expandidos)
	$: displayUsers = expanded ? users : users.slice(0, 5);

	function formatDate(timestamp) {
		const date = new Date(timestamp * 1000);
		return date.toLocaleDateString('es-ES', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function openProfile(href) {
		window.open(href, '_blank');
	}
</script>

<div class="stat-card {cardType}">
	<div class="card-header">
		<div class="stat-info">
			<svelte:component this={icon} size={20} />
			<div class="stat-details">
				<div class="stat-value">{count}</div>
				<div class="stat-label">{title}</div>
			</div>
		</div>
	</div>
	
	<div class="user-list">
		{#each displayUsers as username}
			{@const userData = getUserData(username, dataArray)}
			<div class="user-item {cardType}">
				<div class="user-info">
					<div class="user-avatar">
						<svelte:component this={icon} size={16} />
					</div>
					<div class="user-details">
						<div class="username">@{username}</div>
						{#if userData?.string_list_data?.[0]?.timestamp}
							<div class="user-date">
								{formatDate(userData.string_list_data[0].timestamp)}
							</div>
						{/if}
					</div>
				</div>
				<button 
					class="user-link-btn"
					on:click={() => openProfile(userData?.string_list_data?.[0]?.href)}
					title="Ver perfil"
				>
					<AlertTriangle size={16} />
				</button>
			</div>
		{/each}
	</div>
	
	{#if users.length > 5}
		<div class="expand-button-container">
			<button class="expand-btn" on:click={onToggle}>
				{#if expanded}
					<ChevronUp size={16} />
					Ver menos
				{:else}
					<ChevronDown size={16} />
					Ver todos ({users.length - 5} más)
				{/if}
			</button>
		</div>
	{/if}
</div>

<style>
	.stat-card {
		background: var(--surface-color);
		border-radius: var(--border-radius);
		box-shadow: var(--shadow);
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
	}

	.stat-card.mutual {
		border-left: 4px solid var(--success-color);
	}

	.stat-card.not-following-back {
		border-left: 4px solid var(--warning-color);
	}

	.stat-card.not-following-them {
		border-left: 4px solid var(--error-color);
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	.stat-info {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex: 1;
	}

	.stat-details {
		flex: 1;
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.stat-label {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin-top: 0.25rem;
	}

	.expand-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border: 1px solid var(--border-color);
		background: transparent;
		color: var(--text-secondary);
		border-radius: var(--border-radius);
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 0.875rem;
	}

	.expand-btn:hover {
		background: var(--primary-color);
		color: white;
		border-color: var(--primary-color);
	}

	.expand-button-container {
		margin-top: 1rem;
		display: flex;
		justify-content: center;
	}

	.user-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		flex: 1;
	}

	.user-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem;
		border-radius: var(--border-radius);
		background: var(--background-color);
		transition: background-color 0.2s ease;
	}

	.user-item:hover {
		background: #f0f0f0;
	}

	.user-item.mutual {
		border-left: 3px solid var(--success-color);
	}

	.user-item.not-following-back {
		border-left: 3px solid var(--warning-color);
	}

	.user-item.not-following-them {
		border-left: 3px solid var(--error-color);
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex: 1;
	}

	.user-avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
	}

	.user-item.mutual .user-avatar {
		background: var(--success-color);
		color: white;
	}

	.user-item.not-following-back .user-avatar {
		background: var(--warning-color);
		color: white;
	}

	.user-item.not-following-them .user-avatar {
		background: var(--error-color);
		color: white;
	}

	.user-details {
		flex: 1;
	}

	.username {
		font-weight: 500;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}

	.user-date {
		font-size: 0.75rem;
		color: var(--text-secondary);
	}

	.user-link-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: none;
		background: transparent;
		color: var(--text-secondary);
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.user-link-btn:hover {
		background: var(--primary-color);
		color: white;
	}

	@media (max-width: 768px) {
		.stat-card {
			padding: 1rem;
		}

		.card-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}
	}
</style> 