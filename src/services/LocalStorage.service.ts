import {ServicesResolver} from '../_global/provider/ServiceResolverClass.ts';
import {AbstractBaseService} from '../_global/provider/AbstractBaseService.ts';

export class LocalStorageService extends AbstractBaseService {
    public static readonly STORE_SETTINGS = 'attendance_Store_Settings';
    protected _localStorage: Storage;
    constructor(provider: ServicesResolver) {
        super(provider);
        this._localStorage = localStorage;
    }

    getItem(key: string) {
        return this._localStorage.getItem(key);
    }
    setItem(keyName: string, keyValue: string) {
        this._localStorage.setItem(keyName, keyValue);
    }
    getObjectOrNull(key: string) {
        try {
            const item = this._localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            return null;
        }
    }
    setObject(key: string, value: any) {
        this._localStorage
            .setItem(key, JSON.stringify(value));
    }
    clear(): void {
        this._localStorage.clear();
    }

    removeItem(key: string) {
        this._localStorage.removeItem(key);
    }
}
