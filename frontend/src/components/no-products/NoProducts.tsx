import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NoProducts = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <ShoppingCart className="h-16 w-16 text-muted-foreground animate-pulse" />
            <h3 className="text-xl font-semibold">Nenhum produto aqui</h3>
            <p className="text-sm text-muted-foreground">
                Parece que você ainda não adicionou nenhum produto.
            </p>
            <Button variant="outline" onClick={() => navigate('/new')}>
                Adicione seu primeiro produto
            </Button>
        </div>
    );
};

export default NoProducts;