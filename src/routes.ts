import type {RouteObject} from './_core/router/router.ts';


export const routes : RouteObject[] = [
    {
        path : '/',
        index: true,
        element: ( ) => `<app-page></app-page>`
    }

]
