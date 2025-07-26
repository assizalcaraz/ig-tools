<script lang="ts">
	import { BarChart3, Search, History, Home } from 'lucide-svelte';
	import { page } from '$app/stores';

	$: currentPath = $page.url.pathname;
</script>

<nav class="navigation">
	<div class="nav-container">
		<div class="nav-brand">
			<h1>Instagram Tools</h1>
		</div>
		
		<div class="nav-links">
			<a href="/" class="nav-link" class:active={currentPath === '/'}>
				<Home size={20} />
				Dashboard
			</a>
		</div>
	</div>
</nav>

<style>
	.navigation {
		background: var(--surface-color);
		border-bottom: 1px solid var(--border-color);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 1rem 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav-brand h1 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary-color);
		margin: 0;
	}

	.nav-links {
		display: flex;
		gap: 1rem;
	}

	.nav-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		color: var(--text-secondary);
		text-decoration: none;
		border-radius: var(--border-radius);
		transition: all 0.2s ease;
		font-weight: 500;
	}

	.nav-link:hover {
		color: var(--text-primary);
		background: var(--background-color);
	}

	.nav-link.active {
		color: var(--primary-color);
		background: var(--primary-color);
		color: white;
	}

	@media (max-width: 768px) {
		.nav-container {
			padding: 1rem;
			flex-direction: column;
			gap: 1rem;
		}

		.nav-links {
			width: 100%;
			justify-content: center;
		}

		.nav-link {
			flex: 1;
			justify-content: center;
			font-size: 0.875rem;
		}
	}
</style> 