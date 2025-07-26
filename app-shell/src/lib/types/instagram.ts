// Tipos base para los datos de Instagram
export interface StringListData {
	href: string;
	value: string;
	timestamp: number;
}

export interface MediaListData {
	// Estructura para datos de medios
}

export interface StringMapData {
	[key: string]: {
		href: string;
		value: string;
		timestamp: number;
	};
}

export interface MediaMapData {
	// Estructura para datos de medios mapeados
}

export interface InstagramDataItem {
	title: string;
	media_list_data: MediaListData[];
	string_list_data: StringListData[];
	media_map_data: MediaMapData;
	string_map_data: StringMapData;
}

// Tipos específicos para cada categoría
export interface FollowersData extends InstagramDataItem {
	string_list_data: StringListData[];
}

export interface ProfileInformation {
	profile_account_insights: InstagramDataItem[];
}

export interface AudienceInsights {
	organic_insights_audience: InstagramDataItem[];
}

export interface ContentInteractions {
	organic_insights_content: InstagramDataItem[];
}

export interface ReelsData {
	organic_insights_reels: InstagramDataItem[];
}

export interface LiveVideosData {
	organic_insights_live_videos: InstagramDataItem[];
}

export interface ProfilesReachedData {
	organic_insights_profiles_reached: InstagramDataItem[];
}

// Tipos para el dashboard
export interface DashboardData {
	connections: {
		followers: FollowersData[];
		following: FollowersData[];
		closeFriends: FollowersData[];
		blockedProfiles: FollowersData[];
		favoritedProfiles: FollowersData[];
		recentFollowRequests: FollowersData[];
		recentlyUnfollowed: FollowersData[];
		removedSuggestions: FollowersData[];
	};
	personalInformation: {
		profileInformation: ProfileInformation;
		personalInfo: any;
		professionalInfo: any;
		profileChanges: any;
		reposts: any;
		noteInteractions: any;
		friendMap: any;
	};
	insights: {
		audienceInsights: AudienceInsights;
		contentInteractions: ContentInteractions;
		reels: ReelsData;
		liveVideos: LiveVideosData;
		profilesReached: ProfilesReachedData;
	};
	media: {
		// Datos de medios
	};
}

// Tipos para estadísticas
export interface StatsCardData {
	title: string;
	value: string | number;
	change?: string;
	icon: string;
	color: string;
}

export interface ChartData {
	labels: string[];
	datasets: {
		label: string;
		data: number[];
		backgroundColor: string[];
		borderColor: string[];
		borderWidth: number;
	}[];
} 