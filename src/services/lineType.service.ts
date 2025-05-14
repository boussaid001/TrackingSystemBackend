import { LineTypeDoc, LineTypeModel } from '../models/line-type.model';
import { BaseService } from './base.service';

export class LineTypeService extends BaseService<LineTypeDoc> {
    constructor() {
        super(LineTypeModel);
    }
    async getLineTypeById(lineTypeId: number) {
        try {
            const lineType = await this.model.findOne({ id: lineTypeId });
            console.log(
                '👊 ~ file: lineType.service.ts:11 ~ LineTypeService ~ getLineTypeById ~ lineType:',
                lineType
            );
            return lineType;
        } catch (error) {
            console.log("LineType not found")
            throw new Error('LineType not found');
        }
    }
    async GetLineTypeByCode(code: string) {
        return await this.model.find({ code: code }).lean();
    }
}
