import {
    FlashingStatusDoc,
    FlashingStatusModel
} from '../models/flashing-status.model';
import { BaseService } from './base.service';

export class FlashingStatusService extends BaseService<FlashingStatusDoc> {
    constructor() {
        super(FlashingStatusModel);
    }
}
