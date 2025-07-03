export const Environment = {
    Development: 'development',
    Production: 'production',
    Test: 'test',
}

export type Environment =   typeof  Environment[keyof typeof Environment];

