export  class HashRouter {
    private static instance: HashRouter;
    private routes: Map<string, () => void>;

    private constructor() {
        this.routes = new Map();
        window.addEventListener('hashchange', this.handleHashChange.bind(this));
    }

    public static getInstance(): HashRouter {
        if (!HashRouter.instance) {
        HashRouter.instance = new HashRouter();
        }
        return HashRouter.instance;
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
