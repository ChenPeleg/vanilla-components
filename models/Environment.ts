import {makeBrandedType} from './makeBrandedType.ts';

export const Environment = makeBrandedType({
    Development: "development",
    Production: "production",
    Test: "test",
}, 'environment');

export type Environment = (typeof Environment)[keyof typeof Environment];
