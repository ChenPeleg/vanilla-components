import { AbstractBaseService } from '../_global/provider/AbstractBaseService.ts';
import { ServicesResolver } from '../_global/provider/ServiceResolverClass.ts';
import   {Router} from '../_core/router/router.ts';
import {routes} from './routes.ts';

export class HashRouterService extends AbstractBaseService {
    private readonly router: Router

    constructor(provider: ServicesResolver) {
        super(provider);
        this.router = new Router({routes});
    }
    getRouter(): Router {
        return this.router;
    }


}

