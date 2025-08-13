import type {StoreReducer} from '../_global/StoreFactory.ts';
import type {AppStoreModel} from './app-store-model.ts';
import {type AppAction} from '../models/AppAction.ts';
import {AppActionType} from './app-action-type.ts';
import {_ServicesProvider} from '../services/_ServicesProvider.ts';
import {LocalStorageService} from '../services/LocalStorage.service.ts';


export const appReducer: StoreReducer<AppStoreModel, AppAction> = (state: AppStoreModel, action: AppAction): AppStoreModel => {

    const localStorage = _ServicesProvider.getService(LocalStorageService);

    switch (action.type) {
        case AppActionType.addOne:
            return {
                ...state,
                count: state.count + 1
            };

        case AppActionType.clearStorage:
            localStorage.clear();
            return {
                ...state,
                count: 0
            };



        default:
            return state;
    }
}

