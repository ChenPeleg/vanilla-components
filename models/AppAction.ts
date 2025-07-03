export const  ActionType = {
    addChild : 'addChild',
    checkInChild : 'checkInChild',
    checkOutChild : 'checkOutChild',
    childAbsentFromDay : 'childAbsentFromDay',
    childPresentInDay : 'childPresentInDay',
    changeDisplayedTab : 'changeDisplayedTab',
    completeList : 'completeList',
    clearAllData : 'clearAllData',
    changeSort : 'changeSort',
    changeListOrGrid : 'changeListOrGrid',
    removerAddedChild : 'removerAddedChild'
} as const;

export type  AppAction = {
                             type: ActionType.checkInChild | ActionType.removerAddedChild | ActionType.changeListOrGrid | ActionType.checkOutChild | ActionType.childAbsentFromDay | ActionType.childPresentInDay;
                             payload: any;
                         } | {
                             type: ActionType.addChild; payload: any;
                         } | {
                             type: ActionType.changeDisplayedTab; payload: any;
                         } | {
                             type: ActionType.completeList; payload: any;
                         } | {
                             type: ActionType.clearAllData; payload: any;
                         } | {
                                type: ActionType.changeSort; payload: any;
                         }

