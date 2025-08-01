import type {RouteObject} from '../_core/router/router.ts';

export const routes : RouteObject[] = [
    {
        path : '/',
        index: true,
        callback: ( ) => `<main-content></main-content>`
    },
    {
        path : '/about',
        callback: ( ) => `<about-page></about-page>`
    }

]
