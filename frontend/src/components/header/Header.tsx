import type { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

interface HeaderProps {
    children?: ReactNode;
}

const Header: FC<HeaderProps> = () => {
    return (
        <header className="bg-primary text-primary-foreground py-3 mb-5">
            <div className="container mx-auto flex items-center justify-between px-4">
                <h1 className="text-2xl font-semibold flex items-center gap-2">
                    <ShoppingCart className="h-6 w-6 text-muted-foreground" />
                    <span>Product Hub</span>
                </h1>
                <nav className="flex items-center space-x-3">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `px-3 py-1 rounded-lg transition-colors ${isActive ? 'bg-primary-foreground text-primary' : 'hover:bg-primary/20'
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/new"
                        className={({ isActive }) =>
                            `px-3 py-1 rounded-lg transition-colors ${isActive ? 'bg-primary-foreground text-primary' : 'hover:bg-primary/20'
                            }`
                        }
                    >
                        Cadastrar produto
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;