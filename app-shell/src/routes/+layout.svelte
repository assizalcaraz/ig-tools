<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { 
		BarChart3, 
		Scissors, 
		Home,
		Settings
	} from 'lucide-svelte';

	$: currentPath = $page.url.pathname;
</script>

<div class="app-container">
	<!-- Sidebar Navigation -->
	<nav class="sidebar">
		<div class="sidebar-header">
			<h1>Instagram Tools</h1>
		</div>
		
		<ul class="nav-menu">
			<li>
				<a href="/" class="nav-link" class:active={currentPath === '/'}>
					<Home size={20} />
					<span>Inicio</span>
				</a>
			</li>
			<li>
				<a href="/dashboard" class="nav-link" class:active={currentPath.startsWith('/dashboard')}>
					<BarChart3 size={20} />
					<span>Dashboard</span>
				</a>
			</li>
			<li>
				<a href="/scraper" class="nav-link" class:active={currentPath.startsWith('/scraper')}>
					<Scissors size={20} />
					<span>Scraper</span>
				</a>
			</li>
			<li>
				<a href="/settings" class="nav-link" class:active={currentPath === '/settings'}>
					<Settings size={20} />
					<span>Configuración</span>
				</a>
			</li>
		</ul>
	</nav>

	<!-- Main Content -->
	<main class="main-content">
		<slot />
	</main>
</div>

<style>
	.app-container {
		display: flex;
		min-height: 100vh;
	}

	.sidebar {
		width: 250px;
		background: var(--surface-color);
		border-right: 1px solid var(--border-color);
		padding: var(--spacing-lg);
		position: fixed;
		height: 100vh;
		overflow-y: auto;
	}

	.sidebar-header h1 {
		margin: 0 0 var(--spacing-xl) 0;
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--text-primary);
	}

	.nav-menu {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.nav-menu li {
		margin-bottom: var(--spacing-xs);
	}

	.nav-link {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-md);
		color: var(--text-secondary);
		text-decoration: none;
		border-radius: var(--border-radius);
		transition: all var(--transition);
		font-weight: 500;
	}

	.nav-link:hover {
		background: var(--bg-color);
		color: var(--text-primary);
	}

	.nav-link.active {
		background: var(--primary-color);
		color: white;
	}

	.main-content {
		flex: 1;
		margin-left: 250px;
		padding: var(--spacing-xl);
		background: var(--bg-color);
	}

	@media (max-width: 768px) {
		.sidebar {
			width: 100%;
			height: auto;
			position: relative;
			border-right: none;
			border-bottom: 1px solid var(--border-color);
		}

		.main-content {
			margin-left: 0;
		}

		.app-container {
			flex-direction: column;
		}
	}
</style> 