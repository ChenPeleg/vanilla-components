import {ServicesResolver} from '../_global/provider/ServiceResolverClass.ts';
import {AbstractBaseService} from '../_global/provider/AbstractBaseService.ts';
import {LocalStorageService} from './LocalStorage.service.ts';
import {type AppStoreModel, DisplayType,} from '../store/app-store-model.ts';
import {StoreFactory, type StoreReducer} from '../_global/StoreFactory.ts';
import type {AppAction} from '../models/AppAction.ts';
import {appReducer} from '../store/app-reducer.ts';
import type {Subscription} from '../models/Subscription.ts';


export class StoreService extends AbstractBaseService {
    private readonly _initialState: AppStoreModel;
    private subscribers: { cb: (newState: AppStoreModel) => void, id: number }[];
    private subscriberId = 0;

    constructor(provider: ServicesResolver) {
        super(provider);
        this._initialState = this.createInitialStoreState();
        this.subscribers = [];
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

    subscribe(fn: (newState: AppStoreModel) => void): Subscription {
        this.subscribers.push({
            cb: fn,
            id: this.subscriberId
        });
        return {
            unsubscribe: () => this.unsubscribe(this.subscriberId++)
        };
    }

    unsubscribe(id: number) {
        this.subscribers = this.subscribers.filter(sub => sub.id !== id);
    }

    private createStore() {
        const stateFromLocalStorage = this.storeFromLocalStorage();

        const globalStore: StoreFactory<AppAction, AppStoreModel, typeof appReducer> = new StoreFactory({
            reducer: appReducer,
            defaultState: stateFromLocalStorage || this.initialState
        });
        globalStore.subscribe((state: AppStoreModel) => {
            this.subscribers.forEach(sub => sub.cb(state));
            this.servicesResolver.getService(LocalStorageService).setObject(LocalStorageService.STORE_SETTINGS, state);
        });
        return this._store = globalStore;
    }

    private storeFromLocalStorage() {
        const stateFromLocalStorage = this.servicesResolver.getService(LocalStorageService).getObjectOrNull(LocalStorageService.STORE_SETTINGS) as AppStoreModel | null;
        if (!stateFromLocalStorage) {
            return null;
        }


        return stateFromLocalStorage

    }

    private createInitialStoreState() {

        const initialState: AppStoreModel = {
            count: 0,
            display: DisplayType.Grid
        }


        return initialState;
    }


}
