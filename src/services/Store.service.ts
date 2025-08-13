import {ServicesResolver} from '../_global/provider/ServiceResolverClass.ts';
import {AbstractBaseService} from '../_global/provider/AbstractBaseService.ts';
import {LocalStorageService} from './LocalStorage.service.ts';
import type {AppStoreModel} from '../store/app-store-model.ts';
import {StoreFactory, type StoreReducer} from '../_global/StoreFactory.ts';
import type {AppAction} from '../models/AppAction.ts';
import {appReducer} from '../store/app-reducer.ts';



export class StoreService extends AbstractBaseService {
    private readonly _initialState: AppStoreModel;

    constructor(provider: ServicesResolver) {
        super(provider);
        this._initialState = this.createInitialStoreState();
    }

    private _store: StoreFactory<AppAction, AppStoreModel, typeof appReducer> | null = null;

    get store(): StoreFactory<AppAction, AppStoreModel, StoreReducer<AppStoreModel, AppAction>> {
        if (!this._store) {
            this._store = this.createStore();
        }
        return this._store;
    }

    get initialState(): AppStoreModel {
        return this._initialState;
    }

    private createStore() {
        const stateFromLocalStorage = this.storeFromLocalStorage()

        const globalStore: StoreFactory<AppAction, AppStoreModel, typeof appReducer> = new StoreFactory({
            reducer: appReducer,
            defaultState: stateFromLocalStorage || this.initialState
        })
        globalStore.subscribe((state: AppStoreModel) => {
            this.servicesResolver.getService(LocalStorageService).setObject(LocalStorageService.STORE_SETTINGS, state);
        })
        return this._store = globalStore;
    }

    private storeFromLocalStorage() {
        const stateFromLocalStorage = this.servicesResolver.getService(LocalStorageService).getObjectOrNull(LocalStorageService.STORE_SETTINGS) as AppStoreModel | null;
        if (!stateFromLocalStorage) {
            return null;
        }

    }


    private createInitialStoreState() {
        const initialState: any = {}
        return initialState;
    }


}
