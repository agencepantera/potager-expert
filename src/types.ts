export interface BlogPost {
    title: string;
    description?: string;
    date: string;
    author: string;
    image: string;
    category: string;
    slug: string;
    excerpt: string;
    readingTime: string;
}

export interface TableOfContentsItem {
    text: string;
    slug: string;
    depth: number;
}

export type TableOfContents = {
    [key: string]: TableOfContentsItem[];
} & {
    'guide-compostage': TableOfContentsItem[];
    'tomates-debutants': TableOfContentsItem[];
    'permaculture-debutants': TableOfContentsItem[];
}

export interface OptimizedImagePaths {
    webp: string;
    original: string;
}
