<script lang="ts">
	import { User, ExternalLink, Calendar, ChevronDown, ChevronUp } from 'lucide-svelte';

	export let title;
	export let users;
	export let maxItems = 10;

	let expanded = false;

	$: displayUsers = expanded ? users : users.slice(0, maxItems);
	$: hasMore = users.length > maxItems;
	$: showExpandButton = hasMore;

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

	function toggleExpanded() {
		expanded = !expanded;
	}
</script>

<div class="user-list-card">
	<div class="card-header">
		<h3 class="card-title">
			<User size={20} />
			{title}
		</h3>
		<div class="card-count">{users.length} usuarios</div>
	</div>

	<div class="user-list">
		{#each displayUsers as user, index}
			<div class="user-item">
				<div class="user-info">
					<div class="user-avatar">
						<User size={16} />
					</div>
					<div class="user-details">
						<div class="username">@{user.value}</div>
						<div class="user-date">
							<Calendar size={12} />
							{formatDate(user.timestamp)}
						</div>
					</div>
				</div>
				<button 
					class="user-link-btn"
					on:click={() => openProfile(user.href)}
					title="Ver perfil"
				>
					<ExternalLink size={16} />
				</button>
			</div>
		{/each}
	</div>

	{#if showExpandButton}
		<div class="expand-section">
			<button class="expand-btn" on:click={toggleExpanded}>
				{#if expanded}
					<ChevronUp size={16} />
					Ver menos
				{:else}
					<ChevronDown size={16} />
					Ver todos ({users.length - maxItems} más)
				{/if}
			</button>
		</div>
	{/if}
</div>

<style>
	.user-list-card {
		background: var(--surface-color);
		border-radius: var(--border-radius);
		box-shadow: var(--shadow);
		padding: 1.5rem;
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	.card-title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.card-count {
		font-size: 0.875rem;
		color: var(--text-secondary);
		background: var(--background-color);
		padding: 0.25rem 0.75rem;
		border-radius: 1rem;
	}

	.user-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
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
		background: var(--primary-color);
		color: white;
		border-radius: 50%;
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
		display: flex;
		align-items: center;
		gap: 0.25rem;
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

	.expand-section {
		display: flex;
		justify-content: center;
		padding: 1rem 0 0 0;
		border-top: 1px solid var(--border-color);
		margin-top: 1rem;
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
</style> 