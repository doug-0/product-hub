export interface CreateProduct {
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    generateDescription?: boolean;
    aiPromptForImage?: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}
