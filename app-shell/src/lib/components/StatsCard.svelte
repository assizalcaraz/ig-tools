<script lang="ts">
	import { Users, TrendingUp, TrendingDown, UserPlus, UserMinus } from 'lucide-svelte';

	export let stats;

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
			default:
				return Users;
		}
	}
</script>

<div class="stats-card">
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
	</div>
</div>

<style>
	.stats-card {
		background: var(--surface-color);
		border-radius: var(--border-radius);
		box-shadow: var(--shadow);
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
</style> 