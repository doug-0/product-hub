import Layout from '@/layout/Layout';
import ProductForm from '@/components/product-form/ProductForm';

export default function NewProduct() {
    return (
        <Layout>
            <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">Adicionar novo produto</h2>
                <div>
                    <small className="text-sm text-muted-foreground">
                        Preencha os campos abaixo para adicionar um novo produto, campos marcados com * são obrigatórios.
                    </small>
                </div>
                <div>
                    <small className="text-sm text-muted-foreground">
                        De forma opcional, você pode gerar a descrição e a imagem do produto via IA.
                    </small>
                </div>
            </div>
            <ProductForm />
        </Layout>
    );
}