import type {RouteObject} from '../_core/router/router.ts';

export const routes : RouteObject[] = [
    {
        path : '/',
        index: true,
        element: ( ) => `<main-content></main-content>`
    },
    {
        path : '/about',
        element: ( ) => `<about-page></about-page>`
    }

]
