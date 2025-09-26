import type {AppConfiguration} from '../models/AppConfiguration.ts';
import {EnvironmentType} from '../models/EnvironmentType.ts';


export const stagingAppConfig: AppConfiguration = {
    environment: EnvironmentType.Staging,
    isDevelopment: false,
    features: {
        countFeature : true,
    },
}
