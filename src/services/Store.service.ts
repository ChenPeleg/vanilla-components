import {ServicesResolver} from './provider/ServiceResolverClass.ts';
import {AbstractBaseService} from './provider/AbstractBaseService.ts';
import {LocalStorageService} from './LocalStorage.service.ts';
import {AttendanceStore, ChildrenDisplayType, DisplayType} from '../models/AttendanceStore.ts';
import {StoreFactory, StoreReducer} from '../store/factory/StoreFactory.ts';
import {AppAction} from '../models/AppAction.ts';
import {appReducer} from '../reducer/app-reducer.ts';
import {SortOrder, SortType} from '../models/SortType.ts';
import {childrenBaseData} from '../data/childrenPistachioData.ts';
import {PresentToday} from '../models/presentToday.ts';
import {ChildStatus} from '../models/ChildStatus.ts';
import {Environment} from '../models/Environment.ts';
import {ConfigurationService} from './Configuration.service.ts';
import {childrenTestData} from '../data/childrenTestData.ts';
import {TimeAndDateService} from './TimeAndDate.service.ts';


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
        return this.resetChildrenStateIfADayHasPassed(stateFromLocalStorage);
    }

    private resetChildrenStateIfADayHasPassed(state: AttendanceStore) {
        const lastUpdated = state.lastUpdated;
        const currentTime = this.servicesResolver.getService(TimeAndDateService).createTimestamp();
        const hasDateChanged = this.servicesResolver.getService(TimeAndDateService).hasDateChangedBetweenTimestamps(lastUpdated, currentTime);
        if (hasDateChanged) {
            return {
                ...state,
                attendance: state.attendance.map(child => ({
                    ...child,
                    presentToday: PresentToday.Yes,
                    checkedIn: false
                })),
                lastUpdated: currentTime
            }
        }
        return state;
    }

    private createInitialStoreState() {
        const initialState: AttendanceStore = {
            sortType: SortType.Class,
            sortOrder: SortOrder.Ascending,
            display: DisplayType.Attendance,
            attendance: this.getChildrenData(),
            childrenDisplayType: ChildrenDisplayType.List,
            lastUpdated: 0,
            history: []
        }
        return initialState;
    }

    private getChildrenData() {
        return this.getChildrenBaseData().map(child => ({
            ...child,
            presentToday: PresentToday.Yes,
            checkedIn: false
        })) as ChildStatus[];
    }

    private getChildrenBaseData() {
        switch (this.servicesResolver.getService(ConfigurationService).environment) {
            case Environment.Test:
                return childrenTestData;
            case Environment.Production:
            case Environment.Development:
            default:
                return childrenBaseData
        }

    }

}
