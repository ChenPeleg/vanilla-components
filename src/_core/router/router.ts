export type RouteObject = {
    path: string
    index?: boolean
    children?: RouteObject[]
    callback: (params?: any) => string;
}


export class Router {
    private routes: Map<string, RouteObject>;
    private currentPath: string;
    private readonly isHashRouter: boolean;

    constructor({routes, isHashRouter = false} : {
        routes?: RouteObject[],
        isHashRouter?: boolean
    }) {
        this.routes = new Map();
        if (routes) {
            routes.forEach(route => this.registerRoute(route));
        }
        this.currentPath = '';
        this.isHashRouter = isHashRouter;

        // Set up event listeners
        if (this.isHashRouter) {
            window.addEventListener('hashchange', this.handleRouteChange.bind(this));
        } else {
            window.addEventListener('popstate', this.handleRouteChange.bind(this));
        }
    }

    public registerRoute(route: RouteObject): Router {
        this.routes.set(route.path, route);
        return this;
    }

    // Start the router
    public init(): void {
        this.handleRouteChange();
    }

    // Navigate to a specific route
    public navigate(path: string): void {
        if (this.isHashRouter) {
            window.location.hash = path;
        } else {
            window.history.pushState(null, '', path);
            this.handleRouteChange();
        }
    }

    private handleRouteChange(): void {
        this.currentPath = this.isHashRouter ? window.location.hash.slice(1) || '/' : window.location.pathname || '/';

        // Find matching route
        let match = this.findMatchingRoute(this.currentPath);

        if (match) {
            const { route, params } = match;
            if (route.callback) {
                route.callback(params);
            }
        }
    }

    private findMatchingRoute(path: string): { route: RouteObject, params: any } | null {
        // Try exact match first
        if (this.routes.has(path)) {
            return {
                route: this.routes.get(path)!,
                params: {}
            };
        }

        // Check for parameterized routes
        for (const [routePath, routeObj] of this.routes.entries()) {
            const params = this.matchRouteWithParams(routePath, path);
            if (params) {
                return {
                    route: routeObj,
                    params
                };
            }
        }

        return null;
    }

    private matchRouteWithParams(routePath: string, path: string): any | null {

        const paramNames: string[] = [];
        const regexPattern = routePath
            .replace(/:\w+/g, (match) => {
                paramNames.push(match.slice(1));
                return '([^/]+)';
            })
            .replace(/\//g, '\\/');

        const regex = new RegExp(`^${regexPattern}$`);
        const matches = path.match(regex);

        if (!matches) {
            return null;
        }

        const params: { [key: string]: string } = {};
        paramNames.forEach((name, index) => {
            params[name] = matches[index + 1];
        });

        return params;
    }
}
