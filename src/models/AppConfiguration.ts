import type {EnvironmentType} from './EnvironmentType.ts';


export interface AppConfiguration {
  environment: EnvironmentType
  isDevelopment: boolean
  features: {
    countFeature: boolean
  }
}
