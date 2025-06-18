import { getProducts } from '@/api/products';
import type { Product } from '@/types/Product';
import { useEffect, useState } from 'react';

export default function ProductList() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(res => setItems(res.data));
  }, []);

  return (
    <div>
      {items.length === 0 && <p>No products found</p>}
      {items.map(p => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <img src={p.imageUrl} alt={p.name} width={150} />
        </div>
      ))}
    </div>
  );
}
