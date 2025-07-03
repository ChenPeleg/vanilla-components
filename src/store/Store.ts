import {servicesProvider} from '../services/provider/ServicesProvider.ts';
import {StoreService} from '../services/Store.service.ts';


export const globalStore = servicesProvider.getService(StoreService).store;
