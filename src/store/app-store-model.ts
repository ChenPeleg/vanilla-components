import {makeBrandedType} from '../models/makeBrandedType.ts';

export const DisplayType = makeBrandedType({
    Rows : 'Rows',
    Grid : 'Grid',
}, 'displayType');
export type DisplayTypeType = (typeof DisplayType)[keyof typeof DisplayType];


export interface AppStoreModel {
    display: DisplayTypeType;
    count: number;
}
