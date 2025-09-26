import type {AppConfiguration} from '../models/AppConfiguration.ts';
import {EnvironmentType} from '../models/EnvironmentType.ts';


export const packageAppConfig: AppConfiguration = {
    environment: EnvironmentType.Package,
    isDevelopment: false,
    features: {
        countFeature : true,
    },
}
