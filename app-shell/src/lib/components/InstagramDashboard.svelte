<script lang="ts">
	import { onMount } from 'svelte';
	import { dataLoader } from '$lib/services/dataLoader';
	import StatsCard from './StatsCard.svelte';
	import UserList from './UserList.svelte';
	import FollowAnalysis from './FollowAnalysis.svelte';
	import { 
		Users, 
		UserPlus, 
		UserMinus, 
		Heart, 
		Shield, 
		Star, 
		AlertCircle,
		BarChart3,
		Activity,
		TrendingUp,
		Video,
		Eye
	} from 'lucide-svelte';

	let data = null;
	let loading = true;
	let error = '';

	// Estadísticas calculadas
	$: statsCards = data ? [
		{
			title: 'Seguidores',
			value: data.connections?.followers?.length || 0,
			icon: 'users',
			color: 'var(--primary-color)',
			users: extractUsersFromData(data.connections.followers)
		},
		{
			title: 'Siguiendo',
			value: data.connections?.following?.length || 0,
			icon: 'users',
			color: 'var(--secondary-color)',
			users: extractUsersFromData(data.connections.following)
		},
		{
			title: 'Amigos Cercanos',
			value: data.connections?.closeFriends?.length || 0,
			icon: 'users',
			color: 'var(--accent-color)',
			users: extractUsersFromData(data.connections.closeFriends)
		},
		{
			title: 'Perfiles Bloqueados',
			value: data.connections?.blockedProfiles?.length || 0,
			icon: 'users',
			color: 'var(--error-color)',
			users: extractUsersFromData(data.connections.blockedProfiles)
		}
	] : [];

	// Estadísticas de insights si están disponibles
	$: audienceStats = data?.insights?.audienceInsights?.organic_insights_audience?.[0]?.string_map_data;
	$: insightCards = audienceStats ? [
		{
			title: 'Seguidores Totales',
			value: audienceStats.Seguidores?.value || '0',
			change: audienceStats['Diferencia de seguidores']?.value || '',
			icon: 'trending-up',
			color: 'var(--success-color)'
		},
		{
			title: 'Nuevos Seguidores',
			value: audienceStats['Empezaron a seguirte']?.value || '0',
			icon: 'user-plus',
			color: 'var(--success-color)'
		},
		{
			title: 'Dejaron de Seguir',
			value: audienceStats['Dejaron de seguirte']?.value || '0',
			icon: 'user-minus',
			color: 'var(--error-color)'
		}
	] : [];

	$: contentInteractions = data?.insights?.contentInteractions;
	$: contentStatsMap = contentInteractions?.organic_insights_interactions?.[0]?.string_map_data;
	$: contentCards = contentStatsMap ? [
		{
			title: 'Interacciones Totales',
			value: contentStatsMap['Interacciones con el contenido']?.value || '0',
			change: contentStatsMap['Diferencia de interacciones con el contenido']?.value || '',
			icon: 'activity',
			color: 'var(--primary-color)'
		},
		{
			title: 'Reels',
			value: contentStatsMap['Interacciones con reels']?.value || '0',
			change: contentStatsMap['Diferencia de interacciones con los reels']?.value || '',
			icon: 'video',
			color: 'var(--accent-color)'
		},
		{
			title: 'Historias',
			value: contentStatsMap['Interacciones con historias']?.value || '0',
			change: contentStatsMap['Diferencia de interacciones con las historias']?.value || '',
			icon: 'eye',
			color: 'var(--secondary-color)'
		},
		{
			title: 'Publicaciones',
			value: contentStatsMap['Interacciones con publicaciones']?.value || '0',
			change: contentStatsMap['Diferencia de interacciones con las publicaciones']?.value || '',
			icon: 'bar-chart3',
			color: 'var(--success-color)'
		}
	] : [];

	onMount(async () => {
		try {
			loading = true;
			console.log('Iniciando carga de datos...');
			data = await dataLoader.loadAllData();
			console.log('DATA CARGADA:', data);
			console.log('Followers:', data?.connections?.followers?.length);
			console.log('Following:', data?.connections?.following?.length);
			console.log('Close Friends:', data?.connections?.closeFriends?.length);
			console.log('Blocked Profiles:', data?.connections?.blockedProfiles?.length);
		} catch (err) {
			error = 'Error al cargar los datos de Instagram';
			console.error('Error loading data:', err);
		} finally {
			loading = false;
		}
	});

	function extractUsersFromData(dataArray) {
		if (!Array.isArray(dataArray)) return [];
		return dataArray.map(item => item?.string_list_data?.[0]).filter(Boolean);
	}

	function decodeSpecialCharacters(text) {
		if (!text) return '';
		return text
			.replace(/Ã³/g, 'ó')
			.replace(/Ã­/g, 'í')
			.replace(/Ã¡/g, 'á')
			.replace(/Ã©/g, 'é')
			.replace(/Ãº/g, 'ú')
			.replace(/Ã±/g, 'ñ')
			.replace(/Ã³n/g, 'ón')
			.replace(/Ã³n de contactos/g, 'ón de contactos')
			.replace(/Ãºltimo/g, 'último')
			.replace(/Ãºltima/g, 'última')
			.replace(/TransmitiÃ³ en vivo/g, 'Transmitió en vivo')
			.replace(/CÃ³digo del paÃ­s principal/g, 'Código del país principal');
	}
</script>

<div class="dashboard">
	{#if loading}
		<div class="loading">
			<div class="loading-spinner"></div>
			<p>Cargando datos de Instagram...</p>
		</div>
	{:else if error}
		<div class="error">
			<AlertCircle size={48} />
			<h2>Error</h2>
			<p>{error}</p>
		</div>
	{:else if data}
		<!-- Estadísticas principales -->
		<section class="stats-section">
			<h2>Estadísticas Generales</h2>
			<div class="grid grid-cols-4">
				{#each statsCards as stats}
					<StatsCard {stats} users={stats.users} maxItems={5} />
				{/each}
			</div>
		</section>

		<!-- Estadísticas de insights -->
		{#if insightCards.length > 0}
			<section class="stats-section">
				<h2>Insights de Audiencia</h2>
				<div class="grid grid-cols-3">
					{#each insightCards as stats}
						<StatsCard {stats} />
					{/each}
				</div>
			</section>
		{/if}

		<!-- Estadísticas de interacciones de contenido -->
		{#if contentCards.length > 0}
			<section class="stats-section">
				<h2>Interacciones de Contenido</h2>
				<div class="grid grid-cols-4">
					{#each contentCards as stats}
						<StatsCard {stats} />
					{/each}
				</div>
			</section>
		{/if}

		<!-- Análisis de Seguimiento -->
		<FollowAnalysis 
			followers={data.connections.followers}
			following={data.connections.following}
		/>

		<!-- Conexiones eliminadas: ahora las listas se muestran dentro de las tarjetas -->

		<!-- Información Personal -->
		{#if data.personalInformation.profileInformation}
			<section class="profile-section">
				<h2>Información del Perfil</h2>
				<div class="profile-info">
					{#each Object.entries(data.personalInformation.profileInformation.profile_account_insights?.[0]?.string_map_data || {}) as [key, value]}
						<div class="info-item">
							<strong>{decodeSpecialCharacters(key)}:</strong> {decodeSpecialCharacters(value.value)}
						</div>
					{/each}
				</div>
			</section>
		{/if}
	{/if}
</div>

<style>
	.dashboard {
		max-width: 1200px;
		margin: 0 auto;
		padding: var(--spacing-xl);
	}

	.stats-section,
	.connections-section,
	.profile-section {
		margin-bottom: calc(var(--spacing-xl) * 1.5);
	}

	.stats-section h2,
	.connections-section h2,
	.profile-section h2 {
		font-size: var(--font-size-2xl);
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--spacing-lg);
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 400px;
		gap: var(--spacing-lg);
	}

	.error {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 400px;
		gap: var(--spacing-lg);
		text-align: center;
		color: var(--error-color);
	}

	.profile-info {
		background: var(--surface-color);
		border-radius: var(--border-radius);
		box-shadow: var(--shadow);
		padding: var(--spacing-lg);
	}

	.info-item {
		display: flex;
		justify-content: space-between;
		padding: var(--spacing-sm) 0;
		border-bottom: 1px solid var(--border-color);
	}

	.info-item:last-child {
		border-bottom: none;
	}

	.info-item strong {
		color: var(--text-primary);
	}

	@media (max-width: 768px) {
		.dashboard {
			padding: var(--spacing-md);
		}
	}
    /* Ajuste de separación entre las tarjetas dentro de la sección de estadísticas */
    .stats-section .grid {
        gap: var(--spacing-lg);
    }
</style> 