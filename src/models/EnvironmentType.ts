import {makeBrandedType} from './makeBrandedType.ts';

export const EnvironmentType = makeBrandedType({
    Development: "development",
    Production: "production",
    Staging: "staging",
    Package: "package",
    Test: "test",
}, 'environment');

export type EnvironmentType = (typeof EnvironmentType)[keyof typeof EnvironmentType];
