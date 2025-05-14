import { FlashingStatusService } from '../services/flashingStatus.service';
import { LineTypeService } from '../services/lineType.service';
import { LitigationService } from '../services/litigation.service';
import { PackageService } from '../services/package.service';
import { PictureService } from '../services/picture.service';
import { ProductService } from '../services/product.service';
import { TraceabilityService } from '../services/traceabilty.service';

export async function getModelByName(nom: string) {
    try {
        let service;
        // Check the model name and assign the appropriate service class
        switch (nom) {
            case 'package':
                service = new PackageService();
                break;
            case 'product':
                service = new ProductService();
                break;
            case 'flashingStatus':
                service = new FlashingStatusService();
                break;
            case 'lineType':
                service = new LineTypeService();
                break;
            case 'litigation':
                service = new LitigationService();
                break;
            case 'picture':
                service = new PictureService();
                break;
            case 'traceability':
                service = new TraceabilityService();
                break;
            default:
                return false;
        }
        return service;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to load model');
    }
}
