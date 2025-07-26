<script lang="ts">
	import { UserMinus, UserPlus, Users, CheckCircle } from 'lucide-svelte';
	import FollowAnalysisCard from './FollowAnalysisCard.svelte';

	export let followers = [];
	export let following = [];

	let expandedNotFollowingBack = false;
	let expandedNotFollowingThem = false;
	let expandedMutual = false;

	// Análisis de relaciones de seguimiento
	$: followersSet = new Set(followers.map(f => f.string_list_data?.[0]?.value).filter(Boolean));
	$: followingSet = new Set(following.map(f => f.string_list_data?.[0]?.value).filter(Boolean));

	// Quienes sigo pero no me siguen de vuelta
	$: notFollowingBack = Array.from(followingSet).filter(username => !followersSet.has(username));
	
	// Quienes me siguen pero yo no sigo
	$: notFollowingThem = Array.from(followersSet).filter(username => !followingSet.has(username));
	
	// Seguimiento mutuo
	$: mutualFollowers = Array.from(followersSet).filter(username => followingSet.has(username));

	function getUserData(username, dataArray) {
		return dataArray.find(item => item.string_list_data?.[0]?.value === username);
	}

	function toggleNotFollowingBack() {
		expandedNotFollowingBack = !expandedNotFollowingBack;
	}

	function toggleNotFollowingThem() {
		expandedNotFollowingThem = !expandedNotFollowingThem;
	}

	function toggleMutualFollowers() {
		expandedMutual = !expandedMutual;
	}
</script>

<div class="follow-analysis">
	<h2>
		<Users size={24} />
		Análisis de Seguimiento
	</h2>

	<div class="cards-container">
		<!-- Seguimiento Mutuo -->
		<FollowAnalysisCard
			title="Seguimiento Mutuo"
			count={mutualFollowers.length}
			icon={CheckCircle}
			users={mutualFollowers}
			expanded={expandedMutual}
			onToggle={toggleMutualFollowers}
			getUserData={getUserData}
			dataArray={followers}
			cardType="mutual"
		/>

		<!-- No Te Siguen de Vuelta -->
		<FollowAnalysisCard
			title="No Te Siguen de Vuelta"
			count={notFollowingBack.length}
			icon={UserMinus}
			users={notFollowingBack}
			expanded={expandedNotFollowingBack}
			onToggle={toggleNotFollowingBack}
			getUserData={getUserData}
			dataArray={following}
			cardType="not-following-back"
		/>

		<!-- No Los Sigues -->
		<FollowAnalysisCard
			title="No Los Sigues"
			count={notFollowingThem.length}
			icon={UserPlus}
			users={notFollowingThem}
			expanded={expandedNotFollowingThem}
			onToggle={toggleNotFollowingThem}
			getUserData={getUserData}
			dataArray={followers}
			cardType="not-following-them"
		/>
	</div>
</div>

<style>
	.follow-analysis {
		margin-bottom: 3rem;
	}

	.follow-analysis h2 {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 1.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.cards-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 1.5rem;
	}

	@media (max-width: 768px) {
		.cards-container {
			grid-template-columns: 1fr;
		}
	}
</style> 