const API_BASE_URL = import.meta.env.VITE_SCRAPER_API_URL || 'http://localhost:8000';

export interface ScrapingResult {
    id: string;
    username: string;
    scrape_type: 'followers' | 'following' | 'posts' | 'all';
    status: 'pending' | 'completed' | 'failed';
    created_at: string;
    updated_at: string;
    data?: any;
    error?: string;
}

export interface ScrapingRequest {
    username: string;
    scrape_type: 'followers' | 'following' | 'posts' | 'all';
}

class ScraperApiService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = API_BASE_URL;
    }

    private async request(endpoint: string, options: RequestInit = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    // Iniciar un nuevo scraping
    async startScraping(request: ScrapingRequest): Promise<ScrapingResult> {
        return this.request('/api/scrape/', {
            method: 'POST',
            body: JSON.stringify(request),
        });
    }

    // Obtener estado de un scraping
    async getScrapingStatus(scrapingId: string): Promise<ScrapingResult> {
        return this.request(`/api/scrape/${scrapingId}/`);
    }

    // Obtener todos los scrapings
    async getAllScrapings(): Promise<ScrapingResult[]> {
        return this.request('/api/scrape/');
    }

    // Obtener datos de un usuario específico
    async getUserData(username: string): Promise<any> {
        return this.request(`/api/user/${username}/`);
    }

    // Obtener estadísticas del scraper
    async getStats(): Promise<any> {
        return this.request('/api/stats/');
    }

    // Verificar si el servidor está disponible
    async healthCheck(): Promise<boolean> {
        try {
            await this.request('/api/health/');
            return true;
        } catch (error) {
            console.error('Health check failed:', error);
            return false;
        }
    }
}

export const scraperApi = new ScraperApiService(); 