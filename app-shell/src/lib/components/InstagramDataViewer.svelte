<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import StatsCard from './StatsCard.svelte';
	import UserList from './UserList.svelte';
	import { 
		Users, 
		UserPlus, 
		UserMinus, 
		AlertCircle,
		BarChart3,
		Activity,
		TrendingUp,
		Video,
		Eye
	} from 'lucide-svelte';

	// Props del componente
	let data = null;
	let showConnections = true;
	let showInsights = true;
	let showProfileInfo = true;
	let maxUsersPerList = 5;
	let theme = 'light';

	// Eventos
	const dispatch = createEventDispatcher();

	// Estadísticas calculadas
	$: statsCards = data ? [
		{
			title: 'Seguidores',
			value: data.connections.followers.length,
			icon: 'users',
			color: 'var(--primary-color)'
		},
		{
			title: 'Siguiendo',
			value: data.connections.following.length,
			icon: 'users',
			color: 'var(--secondary-color)'
		},
		{
			title: 'Amigos Cercanos',
			value: data.connections.closeFriends.length,
			icon: 'users',
			color: 'var(--accent-color)'
		},
		{
			title: 'Perfiles Bloqueados',
			value: data.connections.blockedProfiles.length,
			icon: 'users',
			color: 'var(--error-color)'
		}
	] : [];

	// Estadísticas de insights
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

	function extractUsersFromData(dataArray) {
		if (!Array.isArray(dataArray)) return [];
		return dataArray.map(item => item?.string_list_data?.[0]).filter(Boolean);
	}

	function handleUserClick(user) {
		dispatch('userClick', { user });
	}

	function handleStatsClick(stats) {
		dispatch('statsClick', { stats });
	}
</script>

<div class="instagram-viewer" class:theme-dark={theme === 'dark'}>
	{#if data}
		<!-- Estadísticas principales -->
		<section class="stats-section">
			<h2>
				<BarChart3 size={24} />
				Estadísticas Generales
			</h2>
			<div class="grid grid-4">
				{#each statsCards as stats}
					<div on:click={() => handleStatsClick(stats)}>
						<StatsCard {stats} />
					</div>
				{/each}
			</div>
		</section>

		<!-- Estadísticas de insights -->
		{#if showInsights && insightCards.length > 0}
			<section class="stats-section">
				<h2>
					<Activity size={24} />
					Insights de Audiencia
				</h2>
				<div class="grid grid-3">
					{#each insightCards as stats}
						<div on:click={() => handleStatsClick(stats)}>
							<StatsCard {stats} />
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Conexiones -->
		{#if showConnections}
			<section class="connections-section">
				<h2>
					<Users size={24} />
					Conexiones
				</h2>
				<div class="grid grid-2">
					<UserList 
						title="Seguidores Recientes" 
						users={extractUsersFromData(data.connections.followers)}
						maxItems={maxUsersPerList}
						on:userClick={handleUserClick}
					/>
					<UserList 
						title="Siguiendo" 
						users={extractUsersFromData(data.connections.following)}
						maxItems={maxUsersPerList}
						on:userClick={handleUserClick}
					/>
					<UserList 
						title="Amigos Cercanos" 
						users={extractUsersFromData(data.connections.closeFriends)}
						maxItems={maxUsersPerList}
						on:userClick={handleUserClick}
					/>
					<UserList 
						title="Perfiles Bloqueados" 
						users={extractUsersFromData(data.connections.blockedProfiles)}
						maxItems={maxUsersPerList}
						on:userClick={handleUserClick}
					/>
				</div>
			</section>
		{/if}

		<!-- Información Personal -->
		{#if showProfileInfo && data.personalInformation.profileInformation}
			<section class="profile-section">
				<h2>
					<Eye size={24} />
					Información del Perfil
				</h2>
				<div class="profile-info">
					{#each Object.entries(data.personalInformation.profileInformation.profile_account_insights?.[0]?.string_map_data || {}) as [key, value]}
						<div class="info-item">
							<strong>{key}:</strong> {value.value}
						</div>
					{/each}
				</div>
			</section>
		{/if}
	{:else}
		<div class="no-data">
			<AlertCircle size={48} />
			<h3>No hay datos disponibles</h3>
			<p>Asegúrate de que los datos de Instagram estén cargados correctamente.</p>
		</div>
	{/if}
</div>

<style>
	.instagram-viewer {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.stats-section,
	.connections-section,
	.profile-section {
		margin-bottom: 3rem;
	}

	.stats-section h2,
	.connections-section h2,
	.profile-section h2 {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 1.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.no-data {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 400px;
		gap: 1rem;
		text-align: center;
		color: var(--text-secondary);
	}

	.profile-info {
		background: var(--surface-color);
		border-radius: var(--border-radius);
		box-shadow: var(--shadow);
		padding: 1.5rem;
	}

	.info-item {
		display: flex;
		justify-content: space-between;
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border-color);
	}

	.info-item:last-child {
		border-bottom: none;
	}

	.info-item strong {
		color: var(--text-primary);
	}

	/* Tema oscuro */
	.theme-dark {
		--background-color: #1a1a1a;
		--surface-color: #2d2d2d;
		--text-primary: #ffffff;
		--text-secondary: #b0b0b0;
		--border-color: #404040;
	}

	@media (max-width: 768px) {
		.instagram-viewer {
			padding: 1rem 0.5rem;
		}

		.stats-section h2,
		.connections-section h2,
		.profile-section h2 {
			font-size: 1.25rem;
		}
	}
</style> 