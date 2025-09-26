import {ServicesResolver} from '../_global/provider/ServiceResolverClass.ts';
import {LocalStorageService} from './LocalStorage.service.ts';
import {TimeAndDateService} from './TimeAndDate.service.ts';
import {ThemeService} from './Theme.service.ts';
import {StoreService} from './Store.service.ts';
import {ConfigurationService} from './Configuration.service.ts';
import {PWAService} from './PWA.service.ts';
import {HashRouterService} from './HashRouter.service.ts';

const ServicesProviderFactory = () => {
    const provider = new ServicesResolver([PWAService, ConfigurationService, LocalStorageService, TimeAndDateService, ThemeService, StoreService, HashRouterService]);
    provider.initServices();
    return provider;
}
export const _ServicesProvider = ServicesProviderFactory();


