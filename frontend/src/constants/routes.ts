export enum AppRoutes {
    HOME = '/',
    NEW_PRODUCT = '/new',
}

export const RouteLabels: Record<AppRoutes, string> = {
    [AppRoutes.HOME]: 'Página inicial',
    [AppRoutes.NEW_PRODUCT]: 'Cadastrar produto',
};