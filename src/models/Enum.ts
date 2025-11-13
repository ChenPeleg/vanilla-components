// Generic type to extract value union from any object
export type Enum<T> = T[keyof T];
