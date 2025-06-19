import { useEffect, useState } from 'react';
import { getProducts } from '@/api/products';
import type { Product } from '@/types/Product';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { formatBRL } from '@/utils/utils';
import NoProducts from '@/components/no-products/NoProducts';

export default function ProductList() {
    const [items, setItems] = useState<Product[]>([]);

    useEffect(() => {
        getProducts().then((res) => setItems(res.data));
    }, []);

    if (items.length === 0) {
        return <NoProducts />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((p) => (
                <Card key={p.id} className="hover:shadow-lg">
                    <CardContent>
                        <img src={p.imageUrl} alt={p.name} className="w-full h-40 object-cover rounded" />
                    </CardContent>
                    <CardHeader>
                        <CardTitle>{p.name}</CardTitle>
                        <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                    </CardHeader>
                    <CardFooter>
                        <span className="font-semibold">{formatBRL(p.price)}</span>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}