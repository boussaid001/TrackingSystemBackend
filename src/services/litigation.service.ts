import { BaseService } from './base.service';
import {
    LitigationDocument,
    LitigationModel
} from '../models/litigation.model';

export class LitigationService extends BaseService<LitigationDocument> {
    constructor() {
        super(LitigationModel);
    }

    async createLitigation(
        litigationData: LitigationDocument
    ): Promise<LitigationDocument> {
        try {
            // TODO : add id auto increment
            const id = (await this.model.find()).length + 1;
            const LitigationBody = { ...litigationData, id };
            const doc = new this.model(LitigationBody);
            return await doc.save();
        } catch (error) {
            console.error('Une erreur est survenue :', error);
            throw new Error(error);
        }
    }
}
