import {ServicesResolver} from '../_global/provider/ServiceResolverClass.ts';
import {AbstractBaseService} from '../_global/provider/AbstractBaseService.ts';
import {makeBrandedType} from '../models/makeBrandedType.ts';

export const PWAStatus = makeBrandedType({
    NotInstalled: 'NotInstalled',
    Installed: 'Installed',
    NotSupported: 'NotSupported',
}, 'pwaStatus');

export type PWAStatus = (typeof PWAStatus)[keyof typeof PWAStatus];

export class PWAService extends AbstractBaseService {


    constructor(provider: ServicesResolver) {
        super(provider);

    }

    promiseCreatePWA(): Promise<Event> {
        return new Promise((resolve, _reject) => {
            console.log('promiseCreatePWA');
            window.addEventListener('beforeinstallprompt', (_event) => {
                _event.preventDefault();
                resolve((_event));
            }, {once: true});
        })
    }

    checkIfCanInstallPWA(): Promise<false | Event> {
        return new Promise((resolve, _reject) => {
            const timeout = setTimeout(() => {
                resolve(false);
            }, 1000);

            window.addEventListener('beforeinstallprompt', (_event) => {
                _event.preventDefault();
                clearTimeout(timeout);
                resolve(_event);
            });
        })
    }

    promisifiedCheckForPWA(): Promise<PWAStatus> {
        return new Promise((resolve, _reject) => {
            if (this.isPwaSupported()) {
                resolve(PWAStatus.NotInstalled);
            }
            if (this.isInStandaloneMode()) {
                resolve(PWAStatus.Installed);
            }

            resolve(PWAStatus.NotInstalled);
        });
    }

    protected init() {

    }

    private isPwaSupported(): boolean {
        return 'beforeinstallprompt' in window;
    }

    private isInStandaloneMode = () => (window.matchMedia('(display-mode: standalone)').matches) || document.referrer.includes('android-app://');


}
