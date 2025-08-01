import {AbstractBaseService} from '../_global/provider/AbstractBaseService.ts';
import {ServicesResolver} from '../_global/provider/ServiceResolverClass.ts';
import {Router, type RouterState} from '../_core/router/router.ts';
import {routes} from '../routes.ts';

export class HashRouterService extends AbstractBaseService {
    private readonly router: Router
    private subscribers: { cb: (newState: RouterState) => void, id: number }[];
    private subscriberId = 0;

    constructor(provider: ServicesResolver) {
        super(provider);
        this.router = new Router({routes});
        this.subscribers = [];
    }

    getRouter(): Router {
        return this.router;
    }

    subscribe(fn: (newState: RouterState) => void) {
        this.subscribers.push({
            cb: fn,
            id: this.subscriberId
        });
        return {
            unsubscribe: () => this.unsubscribe(this.subscriberId++)
        };
    }

    setState(routerState: RouterState) {
        this.subscribers.forEach(sub => sub.cb(routerState));
    }

    unsubscribe(id: number) {
        this.subscribers = this.subscribers.filter(sub => sub.id !== id);
    }


}

