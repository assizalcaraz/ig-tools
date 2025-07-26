<script>
	import { 
		BarChart3, 
		Scissors, 
		ArrowRight,
		Zap,
		Users,
		TrendingUp
	} from 'lucide-svelte';
</script>

<svelte:head>
	<title>Instagram Tools - Inicio</title>
	<meta name="description" content="Herramientas integradas para Instagram" />
</svelte:head>

<div class="home-page">
	<header class="hero">
		<h1>Instagram Tools</h1>
		<p>Plataforma integrada para análisis y scraping de Instagram</p>
	</header>

	<div class="features-grid">
		<div class="feature-card">
			<div class="feature-icon">
				<BarChart3 size={32} />
			</div>
			<h3>Dashboard</h3>
			<p>Visualiza y analiza tus datos de Instagram de manera intuitiva</p>
			<a href="/dashboard" class="feature-link">
				Ir al Dashboard
				<ArrowRight size={16} />
			</a>
		</div>

		<div class="feature-card">
			<div class="feature-icon">
				<Scissors size={32} />
			</div>
			<h3>Scraper</h3>
			<p>Extrae datos de Instagram de forma automatizada y segura</p>
			<a href="/scraper" class="feature-link">
				Ir al Scraper
				<ArrowRight size={16} />
			</a>
		</div>
	</div>

	
</div>

<style>
	.home-page {
		max-width: 1200px;
		margin: 0 auto;
	}

	.hero {
		text-align: center;
		margin-bottom: var(--spacing-xl);
		padding: var(--spacing-xl) 0;
	}

	.hero h1 {
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--spacing-md);
	}

	.hero p {
		font-size: var(--text-lg);
		color: var(--text-secondary);
		margin: 0;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-xl);
	}

	.feature-card {
		background: var(--surface-color);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius);
		padding: var(--spacing-lg);
		transition: all var(--transition);
	}

	.feature-card:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow);
	}

	.feature-icon {
		background: var(--primary-color);
		color: white;
		width: 64px;
		height: 64px;
		border-radius: var(--border-radius);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: var(--spacing-md);
	}

	.feature-card h3 {
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 var(--spacing-sm) 0;
	}

	.feature-card p {
		color: var(--text-secondary);
		margin: 0 0 var(--spacing-md) 0;
		line-height: 1.6;
	}

	.feature-link {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		color: var(--primary-color);
		text-decoration: none;
		font-weight: 500;
		transition: color var(--transition);
	}

	.feature-link:hover {
		color: var(--primary-color-dark);
	}

	.stats-section {
		margin-top: var(--spacing-xl);
	}

	.stats-section h2 {
		font-size: var(--text-xl);
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--spacing-lg);
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-md);
	}

	.stat-card {
		background: var(--surface-color);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius);
		padding: var(--spacing-md);
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
	}

	.stat-card svg {
		color: var(--primary-color);
	}

	.stat-content h4 {
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 var(--spacing-xs) 0;
	}

	.stat-content p {
		font-size: var(--text-sm);
		color: var(--text-secondary);
		margin: 0;
	}

	@media (max-width: 768px) {
		.hero h1 {
			font-size: var(--text-xl);
		}

		.hero p {
			font-size: var(--text-base);
		}

		.features-grid {
			grid-template-columns: 1fr;
		}
	}
</style> 