import {ServicesResolver} from './provider/ServiceResolverClass.ts';
import {AbstractBaseService} from './provider/AbstractBaseService.ts';

export class TimeAndDateService extends AbstractBaseService {

    constructor(provider: ServicesResolver) {
        super(provider);

    }
    private  getDateFromTimestamp(timestamp: number) {
        const date = new Date(timestamp);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
    private  getTodayDate() {
        return this.getDateFromTimestamp(Date.now());
    }
    isFromToday(timestamp: number) {
        return this.getTodayDate() === this.getDateFromTimestamp(timestamp);
    }
    createTimestamp() {
        return Date.now();
    }
    hoursAndMinutes(timestamp: number) {
        const date = new Date(timestamp);
        return `${date.getHours()}:${this.padZero(date.getMinutes())}`;
    }
    padZero(num: number) {
        return num < 10 ? `0${num}` : num;
    }
    hasDateChangedBetweenTimestamps(timestamp1: number, timestamp2: number) {
        return this.getDateFromTimestamp(timestamp1) !== this.getDateFromTimestamp(timestamp2);
    }


}
