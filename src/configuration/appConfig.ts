import { devAppConfig } from './config.dev'
import { prodAppConfig } from './config.prod'
import { testAppConfig } from './config.tests'
import {stagingAppConfig} from './config.staging.ts';
import   {EnvironmentType} from '../models/EnvironmentType.ts';
import type {AppConfiguration} from '../models/AppConfiguration.ts';
import {packageAppConfig} from './config.package.ts';

const getApplicationConfig = (envName: EnvironmentType): AppConfiguration => {
  switch (envName) {
    case 'development':
      return devAppConfig
    case 'production':
      return prodAppConfig
    case 'staging':
      return stagingAppConfig
    case 'test':
      return testAppConfig
      case 'package':
        return packageAppConfig

    default:
      return prodAppConfig
  }
}

/**
 * @type {import('../types/AppConfiguration').AppConfiguration}
 */

export const appConfig = getApplicationConfig(  import.meta.env.VITE_MODE_NAME)

/**
 * -------------------------------------------------------------
 * This is vitest new feature called in-source testing
 * that allows to test the code in the same file, and thus can have access
 * to internal implementation details, JS closures, and private functions
 */

// @ts-expect-error this is for the in-source testing
if (import.meta.vitest) {
  // @ts-expect-error this is for the in-source testing
  const { it, expect, describe } = import.meta.vitest
  describe('App config types for different environments', () => {
    it('should return devAppConfig for development environment', () => {
      const actual = getApplicationConfig(EnvironmentType.Development)
      expect(actual).toEqual(devAppConfig)
    })
    it('should return prodAppConfig for production environment', () => {
      const actual = getApplicationConfig(EnvironmentType.Production)
      expect(actual).toEqual(prodAppConfig)
    })
    it('should return testAppConfig for test environment', () => {
      const actual = getApplicationConfig(EnvironmentType.Test)
      expect(actual).toEqual(testAppConfig)
    })
    it('should return prodAppConfig for unknown environment', () => {
      const actual = getApplicationConfig('unknown' as any)
      expect(actual).toEqual(prodAppConfig)
    })
  })
}
