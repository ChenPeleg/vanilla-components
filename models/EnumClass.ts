export   class EnumClass<T extends {
                                              [s: string]: T[keyof T];
                                          } | ArrayLike<T[keyof T]> = any > {
    getValues(enumObj: T): T[keyof T][] {
        return Object.values(enumObj) as T[keyof T][];
    }

    getKeys(enumObj: T): (keyof T)[] {
        return Object.keys(enumObj) as (keyof T)[];
    }

    isValidValue(enumObj: T, value: any): value is T[keyof T] {
        return this.getValues(enumObj).includes(value);
    }
}

class Env1 extends EnumClass  {
    static Development: 'development';
    static   Production: 'production';
    static    Test: 'test';
}
