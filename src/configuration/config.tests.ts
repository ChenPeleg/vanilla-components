import type {AppConfiguration} from '../models/AppConfiguration.ts';
import {EnvironmentType} from '../models/EnvironmentType.ts';


export const testAppConfig: AppConfiguration = {
    environment: EnvironmentType.Test,
    isDevelopment: true,
    features: {
        countFeature : true,
    },
}
