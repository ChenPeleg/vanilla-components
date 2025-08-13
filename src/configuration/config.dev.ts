import type {AppConfiguration} from '../models/AppConfiguration.ts';
import {EnvironmentType} from '../models/EnvironmentType.ts';


export const devAppConfig: AppConfiguration = {
  environment: EnvironmentType.Development,
  isDevelopment: true,
  features: {
     countFeature : true,
  },
}
