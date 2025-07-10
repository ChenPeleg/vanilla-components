
import {servicesProvider} from '../services/ServicesProvider.ts';
import {TimeAndDateService} from '../services/TimeAndDate.service.ts';


import {StoreService} from '../services/Store.service.ts';
import type {StoreReducer} from './factory/StoreFactory.ts';
import type {AttendanceStore} from '../models/AttendanceStore.ts';
import {type AppAction} from '../models/AppAction.ts';
import {ActionType} from '../models/ActionType.ts';


export const appReducer: StoreReducer<AttendanceStore, AppAction> = (state: AttendanceStore, action: AppAction): AttendanceStore => {
    const getLastUpdateTimeStamp = () => {
        return servicesProvider.getService(TimeAndDateService).createTimestamp();
    };

    switch (action.type) {
        case ActionType.checkInChild:
            return {
                ...state,

            }
        case ActionType.checkOutChild:
            return {
                ...state,

            }
        case ActionType.childAbsentFromDay:
            return {
                ...state,
                lastUpdated: getLastUpdateTimeStamp()
            }
        case ActionType.childPresentInDay:

            return {
                ...state,

                lastUpdated: getLastUpdateTimeStamp()
            }
        case ActionType.addChild:


            return {
                ...state,

            }

        case ActionType.changeDisplayedTab:
            return {
                ...state,
                display: action.payload
            }
        case ActionType.completeList:

            return {
                ...state,

            }
        case ActionType.clearAllData:
            const initialStoreState = servicesProvider.getService(StoreService).initialState;
            const keepState = {

                childrenDisplayType: state.childrenDisplayType
            }

            return {
                ...initialStoreState, ...keepState

            }


        case ActionType.changeListOrGrid:
            return {
                ...state,
                childrenDisplayType: action.payload
            }

        default:
            return state;
    }
}

