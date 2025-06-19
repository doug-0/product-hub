import { useLocation, Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
import { AppRoutes, RouteLabels } from '@/constants/routes';

const Breadcrumb = () => {
    const { pathname } = useLocation();

    const segments = pathname.split('/').filter(Boolean);

    const buildPath = (index: number) => `/${segments.slice(0, index + 1).join('/')}`;

    return (
        <div className='container mx-auto flex items-center justify-between px-4 mb-5'>
            <nav aria-label="Breadcrumb" className="flex items-center text-sm text-muted-foreground">
                <Link to={AppRoutes.HOME} className="hover:text-primary">
                    {RouteLabels[AppRoutes.HOME]}
                </Link>

                {segments.map((segment, idx) => {
                    const path = buildPath(idx) as AppRoutes;
                    const isLast = idx === segments.length - 1;

                    const label = (Object.values(AppRoutes) as string[]).includes(path)
                        ? RouteLabels[path as AppRoutes]
                        : segment.charAt(0).toUpperCase() + segment.slice(1);

                    return (
                        <span key={path} className="flex items-center">
                            <ChevronRightIcon className="h-4 w-4 mx-1" />
                            {isLast ? (
                                <span className="text-primary">{label}</span>
                            ) : (
                                <Link to={path} className="hover:text-primary">
                                    {label}
                                </Link>
                            )}
                        </span>
                    );
                })}
            </nav>
        </div>
    );
};

export default Breadcrumb;
