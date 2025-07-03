import {makeBrandedType} from './makeBrandedType.ts';

export const DisplayType = makeBrandedType({
    Attendance: 'Attendance',
    SchoolBus: 'SchoolBus',
    DaySettings: 'DaySettings',
}, 'displayType');
export type DisplayTypeType = (typeof DisplayType)[keyof typeof DisplayType];

export const ChildrenDisplayType = makeBrandedType({
    List: 'List',
    Grid: 'Grid',
}, 'childrenDisplayType');
export type ChildrenDisplayTypeType = (typeof ChildrenDisplayType)[keyof typeof ChildrenDisplayType];

export interface AttendanceStore {
    display: DisplayTypeType;

    childrenDisplayType: ChildrenDisplayTypeType;
    lastUpdated: number;
}
