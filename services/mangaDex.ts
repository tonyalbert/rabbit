class MangaDexApi {
    private baseUrl = 'https://api.mangadex.org';

    private async fetchData(endpoint: string, params: Record<string, any> = {}) {
        const url = new URL(`${this.baseUrl}${endpoint}`);
        
        Object.keys(params).forEach(key => {
            if (Array.isArray(params[key])) {
                params[key].forEach(value => {
                    // Verifica se o parâmetro é um array e o adiciona na URL com a notação correta
                    url.searchParams.append(`${key}[]`, value);
                });
            } else {
                url.searchParams.append(key, params[key]);
            }
        });
        
        try {
            const response = await fetch(url.toString(), { method: 'GET' });
            if (!response.ok) throw new Error(`Erro: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Erro ao buscar ${endpoint}:`, error);
            return null;
        }
    }
    

    public async getManga(id: string) {
        const response = await this.fetchData(`/manga/${id}`, { includes: ['cover_art'] });
        if (!response) return null;

        const manga = response.data;
        const fileName = manga.relationships[2]?.attributes?.fileName || '';

        return {
            id: manga.id,
            title: manga.attributes.title.en,
            description: manga.attributes.description.pt || manga.attributes.description.en,
            year: manga.attributes.year,
            status: manga.attributes.status,
            lastVolume: manga.attributes.lastVolume,
            lastChapter: manga.attributes.lastChapter,
            cover: fileName 
                ? `https://uploads.mangadex.org/covers/${manga.id}/${fileName}`
                : 'https://th.bing.com/th/id/OIG2.38ZS2m8wm3EbF7odr3Xh?pid=ImgGn'
        };
    }

    public async getMangaList(limit = 20, title = '', includedTags: string[] = []) {
        const includes = ['cover_art'];
        const availableTranslatedLanguage = ['pt-br'];  // Passando como array
    
        const response = await this.fetchData('/manga', {
            limit,
            title,
            availableTranslatedLanguage,  // Passando como array
            includedTags,
            includes: includes // Passando como array
        });
    
        if (!response) return [];
    
        return response.data.map(manga => {
            const fileName = manga.relationships[2]?.attributes?.fileName || '';
            return {
                id: manga.id,
                title: manga.attributes.title.en,
                description: manga.attributes.description.pt || manga.attributes.description.en,
                year: manga.attributes.year,
                status: manga.attributes.status,
                lastVolume: manga.attributes.lastVolume,
                lastChapter: manga.attributes.lastChapter,
                cover: fileName 
                    ? `https://uploads.mangadex.org/covers/${manga.id}/${fileName}`
                    : 'https://th.bing.com/th/id/OIG2.38ZS2m8wm3EbF7odr3Xh?pid=ImgGn'
            };
        });
    }
    

    public async getLikedMangas(mangas: string[]) {
        const likedMangas = await Promise.all(mangas.map(id => this.getManga(id)));
        return likedMangas.filter(manga => manga !== null);
    }

    public async getMangaChapters(id: string) {
        const response = await this.fetchData(`/manga/${id}/aggregate`, { translatedLanguage: ['pt-br'] });
        if (!response) return [];

        return this.extractChapters(response);
    }

    private extractChapters(apiResponse: any) {
        const chapters = [];
        for (const volumeKey in apiResponse.volumes) {
            const volume = apiResponse.volumes[volumeKey];
            for (const chapterKey in volume.chapters) {
                chapters.push(volume.chapters[chapterKey]);
            }
        }
        return chapters;
    }

    public async getChapterData(id: string) {
        const response = await this.fetchData(`/at-home/server/${id}`);
        if (!response) return null;

        const hash = response.chapter.hash;
        const pages = response.chapter.data.map(page => `https://uploads.mangadex.org/data/${hash}/${page}`);

        return { hash, pages };
    }

    public async getTags(limit = 5) {
        const response = await this.fetchData('/manga/tag');
        if (!response) return [];

        return response.data.slice(0, limit).map(tag => ({
            id: tag.id,
            name: tag.attributes.name.en
        }));
    }
}

export const mangaDexApi = new MangaDexApi();
