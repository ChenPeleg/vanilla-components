import type {RouteObject} from '../../_core/router/router.ts';

import {appConfig} from '../../configuration/appConfig.ts';
import {_ServicesProvider} from '../../services/_ServicesProvider.ts';
import {HashRouterService} from '../../services/HashRouter.service.ts';

export const overrideRoutes = () => {
    if (appConfig.environment === 'package') {
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
    const routerService = _ServicesProvider.getService(HashRouterService)
    routerService.updateRoutes(siteRoutes)

}
