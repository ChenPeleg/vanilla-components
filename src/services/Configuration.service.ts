import {ServicesResolver} from '../_global/provider/ServiceResolverClass.ts';
import {AbstractBaseService} from '../_global/provider/AbstractBaseService.ts';
import {EnvironmentType} from '../models/EnvironmentType.ts';


export class ConfigurationService extends AbstractBaseService {
    _environment: EnvironmentType;

    constructor(provider: ServicesResolver) {
        super(provider);
        this._environment = this.getEnvironmentFromEnvVar();
    }
    get environment() {
        return this._environment;
    }

    isDevMode() {
        return this._environment === 'development'
    }
    private getEnvironmentFromEnvVar() {
        const envVar =  import.meta.env.VITE_MODE_NAME;

        switch (envVar) {
            case 'development':
                return EnvironmentType.Development;
            case 'production':
                return EnvironmentType.Production;
            case 'test':
                return EnvironmentType.Test;
            default:
                return EnvironmentType.Production;
        }
    }

}
