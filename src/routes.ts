import type {RouteObject} from './_core/router/router.ts';


export const routes : RouteObject[] = [
    {
        path : '/',
        index: true,
        element: ( ) => `<main-layout><home-page></home-page></main-layout>`
    },
    {
        path : '/home',
        index: true,
        element: ( ) => `<main-layout><home-page></home-page></main-layout>`
    },
    {
        path : '*',
        element: ( ) => `<main-layout><about-page></about-page></main-layout>`
    }

]
