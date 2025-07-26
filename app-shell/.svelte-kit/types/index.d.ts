type DynamicRoutes = {
	
};

type Layouts = {
	"/": undefined;
	"/dashboard": undefined;
	"/scraper": undefined
};

export type RouteId = "/" | "/dashboard" | "/scraper";

export type RouteParams<T extends RouteId> = T extends keyof DynamicRoutes ? DynamicRoutes[T] : Record<string, never>;

export type LayoutParams<T extends RouteId> = Layouts[T] | Record<string, never>;

export type Pathname = "/" | "/dashboard" | "/scraper";

export type ResolvedPathname = `${"" | `/${string}`}${Pathname}`;

export type Asset = "/data/connections/contacts/synced_contacts.json" | "/data/connections/followers_and_following/blocked_profiles.json" | "/data/connections/followers_and_following/close_friends.json" | "/data/connections/followers_and_following/followers_1.json" | "/data/connections/followers_and_following/following.json" | "/data/connections/followers_and_following/following_hashtags.json" | "/data/connections/followers_and_following/hide_story_from.json" | "/data/connections/followers_and_following/pending_follow_requests.json" | "/data/connections/followers_and_following/profiles_you_ve_favorited.json" | "/data/connections/followers_and_following/recent_follow_requests.json" | "/data/connections/followers_and_following/recently_unfollowed_profiles.json" | "/data/connections/followers_and_following/removed_suggestions.json" | "/data/connections/followers_and_following/restricted_profiles.json" | "/data/logged_information/past_instagram_insights/audience_insights.json" | "/data/logged_information/past_instagram_insights/content_interactions.json" | "/data/logged_information/past_instagram_insights/live_videos.json" | "/data/logged_information/past_instagram_insights/posts.json" | "/data/logged_information/past_instagram_insights/profiles_reached.json" | "/data/logged_information/past_instagram_insights/reels.json" | "/data/personal_information/personal_information/instagram_friend_map.json" | "/data/personal_information/personal_information/instagram_profile_information.json" | "/data/personal_information/personal_information/note_interactions.json" | "/data/personal_information/personal_information/personal_information.json" | "/data/personal_information/personal_information/professional_information.json" | "/data/personal_information/personal_information/profile_changes.json" | "/data/personal_information/personal_information/reposts.json" | "/favicon.png";