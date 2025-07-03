import {ServicesResolver} from './provider/ServiceResolverClass.ts';
import {AbstractBaseService} from './provider/AbstractBaseService.ts';
import {ConfigurationService} from './Configuration.service.ts';

export class BackgroundImageService extends AbstractBaseService {
    static numberOfImages = 7;

    constructor(provider: ServicesResolver) {
        super(provider);
    }

    getBaseAssetUrl() {
        const isDevMode = this.servicesResolver.getService(ConfigurationService).isDevMode()
        return isDevMode ? '' : '/attendance'
    }

    getImageUrl() {
        const imageNumber = this.getRandomImageNumber();
        return `${this.getBaseAssetUrl()}/images/img (${imageNumber}).jpg`
    }


    private getRandomImageNumber() {
        return Math.floor(Math.random() * BackgroundImageService.numberOfImages) + 1
    }
}
