import { AbstractBaseService } from '../_global/provider/AbstractBaseService.ts';
import { ServicesResolver } from '../_global/provider/ServiceResolverClass.ts';

export class HashRouterService extends AbstractBaseService {
    private routes: Map<string, () => void>;

    constructor(provider: ServicesResolver) {
        super(provider);
        this.routes = new Map();
        window.addEventListener('hashchange', this.handleHashChange.bind(this));
    }

    public registerRoute(path: string, callback: () => void): void {
        this.routes.set(path, callback);
    }

    private handleHashChange(): void {
        const path = window.location.hash.slice(1);
        const routeCallback = this.routes.get(path);
        if (routeCallback) {
            routeCallback();
        } else {
            console.warn(`No route registered for path: ${path}`);
        }
    }
}

