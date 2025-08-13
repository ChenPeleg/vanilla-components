import type {AppConfiguration} from '../models/AppConfiguration.ts';
import {EnvironmentType} from '../models/EnvironmentType.ts';


export const prodAppConfig: AppConfiguration = {
    environment: EnvironmentType.Production,
    isDevelopment: false,
    features: {
        countFeature : true,
    },
}
