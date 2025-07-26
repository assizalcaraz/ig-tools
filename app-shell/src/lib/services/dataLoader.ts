import type { DashboardData } from '$lib/types/instagram';

class InstagramDataLoader {
	private dataPath = '/data';

	async loadFollowers(): Promise<any[]> {
		try {
			console.log('Cargando followers...');
			const response = await fetch(`${this.dataPath}/connections/followers_and_following/followers_1.json`);
			const data = await response.json();
			console.log('Followers cargados:', data.length);
			return data;
		} catch (error) {
			console.error('Error cargando followers:', error);
			return [];
		}
	}

	async loadFollowing(): Promise<any[]> {
		try {
			console.log('Cargando following...');
			const response = await fetch(`${this.dataPath}/connections/followers_and_following/following.json`);
			const data = await response.json();
			const result = data.relationships_following || [];
			console.log('Following cargados:', result.length);
			return result;
		} catch (error) {
			console.error('Error cargando following:', error);
			return [];
		}
	}

	async loadCloseFriends(): Promise<any[]> {
		try {
			console.log('Cargando close friends...');
			const response = await fetch(`${this.dataPath}/connections/followers_and_following/close_friends.json`);
			const data = await response.json();
			const result = data.relationships_close_friends || [];
			console.log('Close friends cargados:', result.length);
			return result;
		} catch (error) {
			console.error('Error cargando close friends:', error);
			return [];
		}
	}

	async loadBlockedProfiles(): Promise<any[]> {
		try {
			console.log('Cargando blocked profiles...');
			const response = await fetch(`${this.dataPath}/connections/followers_and_following/blocked_profiles.json`);
			const data = await response.json();
			const result = data.relationships_blocked_users || [];
			console.log('Blocked profiles cargados:', result.length);
			return result;
		} catch (error) {
			console.error('Error cargando blocked profiles:', error);
			return [];
		}
	}

	async loadFavoritedProfiles(): Promise<any[]> {
		try {
			const response = await fetch(`${this.dataPath}/connections/followers_and_following/profiles_you_ve_favorited.json`);
			return await response.json();
		} catch (error) {
			console.error('Error cargando favorited profiles:', error);
			return [];
		}
	}

	async loadRecentFollowRequests(): Promise<any[]> {
		try {
			const response = await fetch(`${this.dataPath}/connections/followers_and_following/recent_follow_requests.json`);
			return await response.json();
		} catch (error) {
			console.error('Error cargando recent follow requests:', error);
			return [];
		}
	}

	async loadRecentlyUnfollowed(): Promise<any[]> {
		try {
			const response = await fetch(`${this.dataPath}/connections/followers_and_following/recently_unfollowed_profiles.json`);
			return await response.json();
		} catch (error) {
			console.error('Error cargando recently unfollowed:', error);
			return [];
		}
	}

	async loadRemovedSuggestions(): Promise<any[]> {
		try {
			const response = await fetch(`${this.dataPath}/connections/followers_and_following/removed_suggestions.json`);
			return await response.json();
		} catch (error) {
			console.error('Error cargando removed suggestions:', error);
			return [];
		}
	}

	async loadProfileInformation(): Promise<any> {
		try {
			const response = await fetch(`${this.dataPath}/personal_information/personal_information/instagram_profile_information.json`);
			return await response.json();
		} catch (error) {
			console.error('Error cargando profile information:', error);
			return {};
		}
	}

	async loadPersonalInformation(): Promise<any> {
		try {
			const response = await fetch(`${this.dataPath}/personal_information/personal_information/personal_information.json`);
			return await response.json();
		} catch (error) {
			console.error('Error cargando personal information:', error);
			return {};
		}
	}

	async loadProfessionalInformation(): Promise<any> {
		try {
			const response = await fetch(`${this.dataPath}/personal_information/personal_information/professional_information.json`);
			return await response.json();
		} catch (error) {
			console.error('Error cargando professional information:', error);
			return {};
		}
	}

	async loadProfileChanges(): Promise<any> {
		try {
			const response = await fetch(`${this.dataPath}/personal_information/personal_information/profile_changes.json`);
			return await response.json();
		} catch (error) {
			console.error('Error cargando profile changes:', error);
			return {};
		}
	}

	async loadReposts(): Promise<any> {
		try {
			const response = await fetch(`${this.dataPath}/personal_information/personal_information/reposts.json`);
			return await response.json();
		} catch (error) {
			console.error('Error cargando reposts:', error);
			return {};
		}
	}

	async loadNoteInteractions(): Promise<any> {
		try {
			const response = await fetch(`${this.dataPath}/personal_information/personal_information/note_interactions.json`);
			return await response.json();
		} catch (error) {
			console.error('Error cargando note interactions:', error);
			return {};
		}
	}

	async loadFriendMap(): Promise<any> {
		try {
			const response = await fetch(`${this.dataPath}/personal_information/personal_information/instagram_friend_map.json`);
			return await response.json();
		} catch (error) {
			console.error('Error cargando friend map:', error);
			return {};
		}
	}

	async loadAudienceInsights(): Promise<any> {
		try {
			const response = await fetch(`${this.dataPath}/logged_information/past_instagram_insights/audience_insights.json`);
			return await response.json();
		} catch (error) {
			console.error('Error cargando audience insights:', error);
			return {};
		}
	}

	async loadContentInteractions(): Promise<any> {
		try {
			const response = await fetch(`${this.dataPath}/logged_information/past_instagram_insights/content_interactions.json`);
			return await response.json();
		} catch (error) {
			console.error('Error cargando content interactions:', error);
			return {};
		}
	}

	async loadReels(): Promise<any> {
		try {
			const response = await fetch(`${this.dataPath}/logged_information/past_instagram_insights/reels.json`);
			return await response.json();
		} catch (error) {
			console.error('Error cargando reels:', error);
			return {};
		}
	}

	async loadLiveVideos(): Promise<any> {
		try {
			const response = await fetch(`${this.dataPath}/logged_information/past_instagram_insights/live_videos.json`);
			return await response.json();
		} catch (error) {
			console.error('Error cargando live videos:', error);
			return {};
		}
	}

	async loadProfilesReached(): Promise<any> {
		try {
			const response = await fetch(`${this.dataPath}/logged_information/past_instagram_insights/profiles_reached.json`);
			return await response.json();
		} catch (error) {
			console.error('Error cargando profiles reached:', error);
			return {};
		}
	}

	async loadAllData(): Promise<DashboardData> {
		console.log('Iniciando carga de todos los datos...');
		
		const [
			followers,
			following,
			closeFriends,
			blockedProfiles,
			favoritedProfiles,
			recentFollowRequests,
			recentlyUnfollowed,
			removedSuggestions,
			profileInformation,
			personalInfo,
			professionalInfo,
			profileChanges,
			reposts,
			noteInteractions,
			friendMap,
			audienceInsights,
			contentInteractions,
			reels,
			liveVideos,
			profilesReached
		] = await Promise.all([
			this.loadFollowers(),
			this.loadFollowing(),
			this.loadCloseFriends(),
			this.loadBlockedProfiles(),
			this.loadFavoritedProfiles(),
			this.loadRecentFollowRequests(),
			this.loadRecentlyUnfollowed(),
			this.loadRemovedSuggestions(),
			this.loadProfileInformation(),
			this.loadPersonalInformation(),
			this.loadProfessionalInformation(),
			this.loadProfileChanges(),
			this.loadReposts(),
			this.loadNoteInteractions(),
			this.loadFriendMap(),
			this.loadAudienceInsights(),
			this.loadContentInteractions(),
			this.loadReels(),
			this.loadLiveVideos(),
			this.loadProfilesReached()
		]);

		console.log('Datos cargados:', {
			followers: followers.length,
			following: following.length,
			closeFriends: closeFriends.length,
			blockedProfiles: blockedProfiles.length
		});

		return {
			connections: {
				followers,
				following,
				closeFriends,
				blockedProfiles,
				favoritedProfiles,
				recentFollowRequests,
				recentlyUnfollowed,
				removedSuggestions
			},
			personalInformation: {
				profileInformation,
				personalInfo,
				professionalInfo,
				profileChanges,
				reposts,
				noteInteractions,
				friendMap
			},
			insights: {
				audienceInsights,
				contentInteractions,
				reels,
				liveVideos,
				profilesReached
			},
			media: {}
		};
	}
}

export const dataLoader = new InstagramDataLoader(); 