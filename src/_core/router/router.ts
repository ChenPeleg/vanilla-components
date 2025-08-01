
 export class Router {
   private routes: Map<string, (params?: any) => void>;
   private currentPath: string;
   private useHash: boolean;

   constructor(useHash = false) {
     this.routes = new Map();
     this.currentPath = '';
     this.useHash = useHash;

     // Set up event listeners
     if (this.useHash) {
       window.addEventListener('hashchange', this.handleRouteChange.bind(this));
     } else {
       window.addEventListener('popstate', this.handleRouteChange.bind(this));
     }
   }

   // Register a route
   public on(path: string, callback: (params?: any) => void): Router {
     this.routes.set(path, callback);
     return this;
   }

   // Start the router
   public init(): void {
     this.handleRouteChange();
   }

   // Navigate to a specific route
   public navigate(path: string): void {
     if (this.useHash) {
       window.location.hash = path;
     } else {
       window.history.pushState(null, '', path);
       this.handleRouteChange();
     }
   }

   private handleRouteChange(): void {
     this.currentPath = this.useHash
       ? window.location.hash.slice(1) || '/'
       : window.location.pathname || '/';

     // Find matching route
     let match = this.findMatchingRoute(this.currentPath);

     if (match) {
       const { handler, params } = match;
       handler(params);
     }
   }

   private findMatchingRoute(path: string): { handler: (params?: any) => void, params: any } | null {
     // Try exact match first
     if (this.routes.has(path)) {
       return {
         handler: this.routes.get(path)!,
         params: {}
       };
     }

     // Check for parameterized routes
     for (const [routePath, handler] of this.routes.entries()) {
       const params = this.matchRouteWithParams(routePath, path);
       if (params) {
         return { handler, params };
       }
     }

     return null;
   }

   private matchRouteWithParams(routePath: string, path: string): any | null {
     // Convert route pattern to regex
     const paramNames: string[] = [];
     const regexPattern = routePath
       .replace(/:\w+/g, (match) => {
         paramNames.push(match.slice(1));
         return '([^/]+)';
       })
       .replace(/\//g, '\\/');

     const regex = new RegExp(`^${regexPattern}$`);
     const matches = path.match(regex);

     if (!matches) return null;

     const params: { [key: string]: string } = {};
     paramNames.forEach((name, index) => {
       params[name] = matches[index + 1];
     });

     return params;
   }
 }

