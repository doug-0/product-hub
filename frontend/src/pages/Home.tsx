import Layout from '@/layout/Layout';
import ProductList from '@/components/product-list/ProductList';

export default function Home() {
    return (
        <Layout>
            <h2 className="text-2xl font-bold mb-2">Produtos disponíveis</h2>
            <div className='mb-5'>
                <small className="text-sm text-muted-foreground">
                    Confira abaixo todos os produtos cadastrados no sistema.
                </small>
            </div>
            <ProductList />
        </Layout>
    );
}
