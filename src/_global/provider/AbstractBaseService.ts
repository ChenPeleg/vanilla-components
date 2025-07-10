import {ServicesResolver} from './ServiceResolverClass.ts';

export abstract class AbstractBaseService {
    protected readonly _servicesResolver: ServicesResolver;

    protected constructor(servicesResolver: ServicesResolver) {
        this._servicesResolver = servicesResolver;
    }

    protected get servicesResolver() {
        return this._servicesResolver;
    }

    public $$serviceInit(providerSymbol: symbol) {
         if (this._servicesResolver.getUniqueIdentifier() === providerSymbol) {
            this.init && this.init();
         } else {
            throw new Error( `[${this.constructor.name}] Service not initialized correctly`);
         }
    }
    protected init?() {
    };
}
