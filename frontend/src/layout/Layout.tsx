import type { ReactNode } from 'react';
import Header from '@/components/header/Header';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
import Footer from '@/components/footer/Footer';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <Breadcrumb />
            <main className="flex-1 p-4 container mx-auto">{children}</main>
            <Footer />
        </div>
    );
}
