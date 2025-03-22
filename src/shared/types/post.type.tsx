import { Author } from './author.type';

export type PostStatistics = {
    views: number;
    likes: number;
    platforms: {
        desktop: number;
        mobile: number;
        tablet: number;
    };
    lastViewed: string;
    lastUpdated: string;
};

export type Post = {
    id: string;
    createdAt: string;
    image: string;
    author: Author;
    title: string;
    description: string;
    body?: string;
    tags: string[];
    isDraft?: boolean;
    statistics?: PostStatistics;
};
