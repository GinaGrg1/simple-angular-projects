export interface MediaItem {
    id: number;
    name: string;
    medium: string;
    category: string;
    year: number;
    watchOn: number;
    isFavorite: boolean;
}

export interface MediaItemResponse {
    mediaItems: MediaItem[];
}