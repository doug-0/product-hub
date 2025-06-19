import type { Product } from '@/types/Product';

export const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Black Sneakers with White Sole',
        description: 'Comfortable and stylish black sneakers with a clean white sole, perfect for daily wear.',
        price: 79.99,
        imageUrl: 'https://via.placeholder.com/300x200.png?text=Black+Sneakers',
    },
    {
        id: '2',
        name: 'Classic Leather Wallet',
        description: 'Premium genuine leather wallet with multiple card slots and a sleek design.',
        price: 49.5,
        imageUrl: 'https://via.placeholder.com/300x200.png?text=Leather+Wallet',
    },
    {
        id: '3',
        name: 'Stainless Steel Water Bottle',
        description: 'Insulated stainless steel bottle keeps drinks cold for 24h or hot for 12h.',
        price: 25.0,
        imageUrl: 'https://via.placeholder.com/300x200.png?text=Water+Bottle',
    },
];
