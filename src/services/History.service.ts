import {ServicesResolver} from './provider/ServiceResolverClass.ts';
import {AbstractBaseService} from './provider/AbstractBaseService.ts';
import {TimeAndDateService} from './TimeAndDate.service.ts';
import {HistoryModel} from '../models/HistoryModel.ts';
import {servicesProvider} from './provider/ServicesProvider.ts';

export class HistoryService extends AbstractBaseService {

    constructor(provider: ServicesResolver) {
        super(provider);
    }

    isFromToday(historyRecord: HistoryModel) {
        const timeAndDateService = servicesProvider.getService(TimeAndDateService);
        return timeAndDateService.isFromToday(historyRecord.timestamp);
    }

    lastAttendanceHours(historyRecord: HistoryModel[]) {
        const timeAndDateService = servicesProvider.getService(TimeAndDateService);
        const allRecords = historyRecord.filter(this.isFromToday).map(history => {
            return timeAndDateService.hoursAndMinutes(history.timestamp);
        })
        return [...new Set(allRecords)].reverse().slice(0, 4);
    }


}
