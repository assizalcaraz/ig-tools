<script lang="ts">
	import { Users, TrendingUp, TrendingDown, UserPlus, UserMinus, Activity, Video, Eye, BarChart3, ChevronDown, ChevronUp } from 'lucide-svelte';
	import UserList from './UserList.svelte';

	export let stats;
	export let users = [];
	export let maxItems = 5;

	let expanded = false;

	$: iconComponent = getIconComponent(stats.icon);
	$: changeColor = stats.change?.includes('-') ? 'var(--error-color)' : 'var(--success-color)';

	function getIconComponent(icon) {
		switch (icon) {
			case 'users':
				return Users;
			case 'trending-up':
				return TrendingUp;
			case 'trending-down':
				return TrendingDown;
			case 'user-plus':
				return UserPlus;
			case 'user-minus':
				return UserMinus;
			case 'activity':
				return Activity;
			case 'video':
				return Video;
			case 'eye':
				return Eye;
			case 'bar-chart3':
				return BarChart3;
			default:
				return Users;
		}
	}

	function toggleExpand() {
		if (users.length === 0) return;
		expanded = !expanded;
	}
</script>

<div class="stats-card" on:click={toggleExpand}>
	<div class="stats-header">
		<div class="stats-icon" style="background-color: {stats.color}20; color: {stats.color}">
			<svelte:component this={iconComponent} size={24} />
		</div>
		<div class="stats-info">
			<h3 class="stats-title">{stats.title}</h3>
			<div class="stats-value">{stats.value}</div>
			{#if stats.change}
				<div class="stats-change" style="color: {changeColor}">
					{stats.change}
				</div>
			{/if}
		</div>
		{#if users.length}
			<div class="expand-icon">
				{#if expanded}
					<ChevronUp size={16} />
				{:else}
					<ChevronDown size={16} />
				{/if}
			</div>
		{/if}
	</div>
	{#if expanded && users.length}
		<div class="stats-userlist">
			<UserList title={stats.title} users={users} maxItems={maxItems} />
		</div>
	{/if}
</div>

<style>
	.stats-card {
		background: var(--surface-color);
		border-radius: var(--border-radius);
		/* Borde sutil para mayor contraste en tema claro */
		border: 1px solid var(--border, #e0e0e0);
		/* Sombra más notoria (usa md o fallback) */
		box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.08));
		padding: 1.5rem;
		transition: transform 0.2s ease;
	}

	.stats-card:hover {
		transform: translateY(-2px);
	}

	.stats-header {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.stats-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border-radius: 50%;
	}

	.stats-info {
		flex: 1;
	}

	.stats-title {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-secondary);
		margin-bottom: 0.25rem;
	}

	.stats-value {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}

	.stats-change {
		font-size: 0.75rem;
		font-weight: 500;
	}

	.expand-icon {
		margin-left: auto;
		color: var(--text-secondary);
	}

	.stats-userlist {
		margin-top: 1rem;
	}
</style> 