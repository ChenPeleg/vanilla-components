import {ServicesResolver} from './ServiceResolverClass.ts';
import {LocalStorageService} from '../LocalStorage.service.ts';
import {TimeAndDateService} from '../TimeAndDate.service.ts';
import {ThemeService} from '../Theme.service.ts';
import {StoreService} from '../Store.service.ts';
import {BackgroundImageService} from '../BackgroundImage.service.ts';
import {ConfigurationService} from '../Configuration.service.ts';
import {PWAService} from '../PWA.service.ts';

const ServicesProviderFactory = () => {
    const provider = new ServicesResolver([PWAService, ConfigurationService, BackgroundImageService,   LocalStorageService, TimeAndDateService, ThemeService, StoreService]);
    provider.initServices();
    return provider;
}
export const servicesProvider = ServicesProviderFactory();


