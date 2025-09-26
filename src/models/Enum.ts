// Generic type to extract value union from any object
export type Enum<T> = T[keyof T];

const DisplayMode = {
    LIGHT: 'light',
    DARK: 'dark',
} as const;


const dis: Enum<typeof DisplayMode> = DisplayMode.DARK;

console.log(dis);
