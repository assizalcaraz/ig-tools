export interface ScrapingOptions {
	profileInfo: boolean;
	lastPost: boolean;
	multiplePosts: boolean;
	comments: boolean;
	likes: boolean;
}

export interface ScrapingResponse {
	message: string;
	session_id: number;
	username: string;
}

export interface ScrapingStatus {
	session_id: number;
	username: string;
	status: 'pending' | 'running' | 'completed' | 'failed';
	started_at: string;
	completed_at: string | null;
	error_message: string | null;
}

export interface InstagramProfile {
	username: string;
	followers: number;
	following: number;
	posts: number;
	bio: string;
	website: string;
	is_private: boolean;
	is_verified: boolean;
	profile_picture: string;
	scraped_at: string;
	posts_data: InstagramPost[];
}

export interface InstagramPost {
	id: number;
	post_id: string;
	text: string;
	media: string;
	url: string;
	likes: number;
	comments: number;
	saved: number;
	shared: number;
	timestamp: string;
	comments_data: InstagramComment[];
}

export interface InstagramComment {
	id: number;
	comment_id: string;
	username: string;
	text: string;
	likes: number;
	timestamp: string;
}

class ApiService {
	private baseUrl = 'http://localhost:8000/api';

	async scrapeProfile(username: string, options: ScrapingOptions = {
		profileInfo: true,
		lastPost: true,
		multiplePosts: false,
		comments: true,
		likes: true
	}): Promise<ScrapingResponse> {
		const response = await fetch(`${this.baseUrl}/scrape/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				options
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response.json();
	}

	async getScrapingStatus(sessionId: number): Promise<ScrapingStatus> {
		const response = await fetch(`${this.baseUrl}/status/${sessionId}/`);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response.json();
	}

	async getProfile(username: string): Promise<InstagramProfile> {
		const response = await fetch(`${this.baseUrl}/profile/${username}/`);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response.json();
	}

	async listProfiles(): Promise<InstagramProfile[]> {
		const response = await fetch(`${this.baseUrl}/profiles/`);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response.json();
	}
}

export const apiService = new ApiService(); 