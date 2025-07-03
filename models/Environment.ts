/**
 * @enum {{
 *     Development: 'development',
 *     Production: 'production',
 *     Test: 'test',
 * } }
 * @readonly
 */
export const Environment = {
    Development: 'development',
    Production: 'production',
    Test: 'test',
} as const;
/**
 * @typedef {typeof Environment[keyof typeof Environment]} Environment
 */
//export type Environment   = typeof Environment[keyof typeof Environment];

