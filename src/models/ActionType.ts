import {makeBrandedType} from './makeBrandedType.ts';

export const ActionType = makeBrandedType({
    addChild: 'addChild',
    checkInChild: 'checkInChild',
    checkOutChild: 'checkOutChild',
    childAbsentFromDay: 'childAbsentFromDay',
    childPresentInDay: 'childPresentInDay',
    changeDisplayedTab: 'changeDisplayedTab',
    completeList: 'completeList',
    clearAllData: 'clearAllData',
    changeSort: 'changeSort',
    changeListOrGrid: 'changeListOrGrid',
    removerAddedChild: 'removerAddedChild',
}, 'actionType')  ;

export type ActionType = typeof ActionType[keyof typeof ActionType];
