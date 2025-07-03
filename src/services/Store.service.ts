import {ServicesResolver} from './provider/ServiceResolverClass.ts';
import {AbstractBaseService} from './provider/AbstractBaseService.ts';
import {LocalStorageService} from './LocalStorage.service.ts';
import type {AttendanceStore} from '../models/AttendanceStore.ts';
import {StoreFactory, type StoreReducer} from '../store/factory/StoreFactory.ts';
import type {AppAction} from '../models/AppAction.ts';
import {appReducer} from '../store/app-reducer.ts';



export class StoreService extends AbstractBaseService {
    private readonly _initialState: AttendanceStore;

    constructor(provider: ServicesResolver) {
        super(provider);
        this._initialState = this.createInitialStoreState();
    }

    private _store: StoreFactory<AppAction, AttendanceStore, typeof appReducer> | null = null;

    get store(): StoreFactory<AppAction, AttendanceStore, StoreReducer<AttendanceStore, AppAction>> {
        if (!this._store) {
            this._store = this.createStore();
        }
        return this._store;
    }

    get initialState(): AttendanceStore {
        return this._initialState;
    }

    private createStore() {
        const stateFromLocalStorage = this.storeFromLocalStorage()

        const globalStore: StoreFactory<AppAction, AttendanceStore, typeof appReducer> = new StoreFactory({
            reducer: appReducer,
            defaultState: stateFromLocalStorage || this.initialState
        })
        globalStore.subscribe((state: AttendanceStore) => {
            this.servicesResolver.getService(LocalStorageService).setObject(LocalStorageService.STORE_SETTINGS, state);
        })
        return this._store = globalStore;
    }

    private storeFromLocalStorage() {
        const stateFromLocalStorage = this.servicesResolver.getService(LocalStorageService).getObjectOrNull(LocalStorageService.STORE_SETTINGS) as AttendanceStore | null;
        if (!stateFromLocalStorage) {
            return null;
        }

    }


    private createInitialStoreState() {
        const initialState: any = {}
        return initialState;
    }


}
