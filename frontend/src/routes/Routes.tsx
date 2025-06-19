import { AppRoutes } from '@/constants/routes';
import Home from '@/pages/Home';
import NewProduct from '@/pages/NewProduct';
import type { RouteObject } from 'react-router-dom';

export const appRoutes: RouteObject[] = [
    {
        path: AppRoutes.HOME,
        element: <Home />,
    },
    {
        path: AppRoutes.NEW_PRODUCT,
        element: <NewProduct />,
    },
];
