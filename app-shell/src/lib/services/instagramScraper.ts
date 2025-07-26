// Tipos para los datos de Instagram
export interface InstagramPost {
	id: string;
	text: string;
	media: 'image' | 'video' | 'carousel';
	likes: number;
	comments: number;
	saved: number;
	shared: number;
	timestamp: string;
	url?: string;
}

export interface InstagramProfile {
	username: string;
	followers: number;
	following: number;
	posts: number;
	postsData: InstagramPost[];
	profilePicture?: string;
	bio?: string;
	website?: string;
	isPrivate?: boolean;
	isVerified?: boolean;
}

export interface ScrapingProgress {
	stage: string;
	progress: number;
	current: number;
	total: number;
}

class InstagramScraperService {
	private baseUrl = 'https://www.instagram.com';
	private apiUrl = 'https://i.instagram.com/api/v1';

	// Función principal para scrapear un perfil
	async scrapeProfile(username: string, onProgress?: (progress: ScrapingProgress) => void): Promise<InstagramProfile> {
		const cleanUsername = username.replace('@', '');
		
		try {
			// Etapa 1: Obtener información básica del perfil
			onProgress?.({
				stage: 'Conectando con Instagram...',
				progress: 10,
				current: 1,
				total: 6
			});

			const profileData = await this.getProfileInfo(cleanUsername);
			
			onProgress?.({
				stage: 'Obteniendo información del perfil...',
				progress: 30,
				current: 2,
				total: 6
			});

			// Etapa 2: Obtener datos de seguidores
			onProgress?.({
				stage: 'Recopilando datos de seguidores...',
				progress: 50,
				current: 3,
				total: 6
			});

			const followersData = await this.getFollowersData(cleanUsername);
			
			// Etapa 3: Obtener posts
			onProgress?.({
				stage: 'Analizando posts...',
				progress: 70,
				current: 4,
				total: 6
			});

			const postsData = await this.getPostsData(cleanUsername);
			
			// Etapa 4: Extraer métricas de engagement
			onProgress?.({
				stage: 'Extrayendo métricas de engagement...',
				progress: 90,
				current: 5,
				total: 6
			});

			// Etapa 5: Guardar datos
			onProgress?.({
				stage: 'Guardando datos...',
				progress: 100,
				current: 6,
				total: 6
			});

			return {
				username: cleanUsername,
				followers: followersData.followers,
				following: followersData.following,
				posts: postsData.length,
				postsData: postsData,
				profilePicture: profileData.profilePicture,
				bio: profileData.bio,
				website: profileData.website,
				isPrivate: profileData.isPrivate,
				isVerified: profileData.isVerified
			};

		} catch (error) {
			throw new Error(`Error scraping profile ${cleanUsername}: ${error.message}`);
		}
	}

	// Obtener información básica del perfil
	private async getProfileInfo(username: string) {
		try {
			// En una implementación real, aquí harías una petición HTTP a la API de Instagram
			// Por ahora, simulamos la respuesta
			await this.delay(1000);
			
			return {
				profilePicture: `https://www.instagram.com/${username}/`,
				bio: `Bio de ${username}`,
				website: `https://${username}.com`,
				isPrivate: false,
				isVerified: Math.random() > 0.8
			};
		} catch (error) {
			throw new Error(`Error obteniendo información del perfil: ${error.message}`);
		}
	}

	// Obtener datos de seguidores
	private async getFollowersData(username: string) {
		try {
			// En una implementación real, aquí harías peticiones HTTP para obtener seguidores
			await this.delay(1500);
			
			return {
				followers: Math.floor(Math.random() * 10000) + 100,
				following: Math.floor(Math.random() * 500) + 50
			};
		} catch (error) {
			throw new Error(`Error obteniendo datos de seguidores: ${error.message}`);
		}
	}

	// Obtener datos de posts
	private async getPostsData(username: string): Promise<InstagramPost[]> {
		try {
			// En una implementación real, aquí harías peticiones HTTP para obtener posts
			await this.delay(2000);
			
			const posts: InstagramPost[] = [];
			const postCount = Math.floor(Math.random() * 20) + 5;
			
			for (let i = 0; i < postCount; i++) {
				posts.push({
					id: `post_${username}_${i + 1}`,
					text: `Este es el texto del post ${i + 1} de ${username}`,
					media: ['image', 'video', 'carousel'][Math.floor(Math.random() * 3)] as 'image' | 'video' | 'carousel',
					likes: Math.floor(Math.random() * 1000) + 10,
					comments: Math.floor(Math.random() * 100) + 1,
					saved: Math.floor(Math.random() * 50) + 1,
					shared: Math.floor(Math.random() * 20) + 1,
					timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
					url: `https://www.instagram.com/p/post_${i + 1}/`
				});
			}
			
			return posts;
		} catch (error) {
			throw new Error(`Error obteniendo datos de posts: ${error.message}`);
		}
	}

	// Función auxiliar para simular delays
	private delay(ms: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	// Función para validar si un username es válido
	validateUsername(username: string): boolean {
		if (!username) return false;
		const cleanUsername = username.replace('@', '');
		return /^[a-zA-Z0-9._]+$/.test(cleanUsername);
	}

	// Función para guardar datos en localStorage
	saveToLocalStorage(data: InstagramProfile): void {
		try {
			const key = `instagram_data_${data.username}_${new Date().toISOString().split('T')[0]}`;
			localStorage.setItem(key, JSON.stringify(data));
		} catch (error) {
			console.error('Error guardando en localStorage:', error);
		}
	}

	// Función para cargar datos desde localStorage
	loadFromLocalStorage(username: string, date?: string): InstagramProfile | null {
		try {
			const searchDate = date || new Date().toISOString().split('T')[0];
			const key = `instagram_data_${username}_${searchDate}`;
			const data = localStorage.getItem(key);
			return data ? JSON.parse(data) : null;
		} catch (error) {
			console.error('Error cargando desde localStorage:', error);
			return null;
		}
	}
}

export const instagramScraper = new InstagramScraperService(); 