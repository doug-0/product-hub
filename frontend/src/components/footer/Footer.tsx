import type { FC } from 'react';

const Footer: FC = () => {
    return (
        <footer className="bg-primary/10 text-muted-foreground mt-auto py-4">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 text-sm">
                <p>&copy; {new Date().getFullYear()} Product Hub. Todos os direitos reservados.</p>
                <div className="flex items-center gap-4 mt-2 md:mt-0">
                    <span>
                        Desenvolvido por
                        <a
                            href="https://github.com/doug-0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline mx-1"
                        >
                            Douglas Oliveira
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
