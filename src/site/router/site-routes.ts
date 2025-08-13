import type {RouteObject} from '../../_core/router/router.ts';
import {routes} from '../../routes.ts';
import {appConfig} from '../../configuration/appConfig.ts';

export const overrideRoutes = () => {
    if (appConfig.environment !== 'package') {
        return;
    }
    const siteRoutes: RouteObject[] = [{
        path: '/',
        index: true,
        element: () => `<main-layout><home-page></home-page></main-layout>`
    }, {
        path: '/home',
        index: true,
        element: () => `<main-layout><home-page></home-page></main-layout>`
    }, {
        path: '*',
        element: () => `<main-layout><about-page></about-page></main-layout>`
    }

    ]
    routes.pop()
    routes.concat(siteRoutes)
}
