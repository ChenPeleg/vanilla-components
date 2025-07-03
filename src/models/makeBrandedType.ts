type Branded<T, Brand extends string> = T & { __brand: Brand };


export const makeBrandedType = <const T extends Record<string, string>>(obj: T, brand : string) => {
    return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [
            k,
            v as Branded<typeof v, typeof brand>,
        ]),
    ) as {
        [K in keyof T]: Branded<T[K], typeof brand>;
    };
};
