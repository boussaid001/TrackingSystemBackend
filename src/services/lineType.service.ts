import { LineTypeDoc, LineTypeModel } from '../models/line-type.model';
import { BaseService } from './base.service';
import mongoose from 'mongoose';

export class LineTypeService extends BaseService<LineTypeDoc> {
    constructor() {
        super(LineTypeModel);
    }
    async getLineTypeById(lineTypeId: string | number) {
        try {
            let lineType = null;
            
            // Try to find by MongoDB ObjectID if it looks like an ObjectID
            if (typeof lineTypeId === 'string' && /^[0-9a-fA-F]{24}$/.test(lineTypeId)) {
                try {
                    lineType = await this.model.findById(lineTypeId);
                    console.log('Found by ObjectID:', lineType);
                } catch (err) {
                    console.log('Error finding by ObjectID:', err);
                }
            }
            
            // If not found, try finding by numeric id
            if (!lineType) {
                lineType = await this.model.findOne({ id: Number(lineTypeId) });
                console.log('Found by numeric ID:', lineType);
            }
            
            // If still not found, try finding by the code field
            if (!lineType) {
                lineType = await this.model.findOne({ code: 'DEFAULT' });
                console.log('Found by default code:', lineType);
            }
            
            // As a last resort, get the first LineType in the collection
            if (!lineType) {
                lineType = await this.model.findOne({});
                console.log('Found first LineType:', lineType);
            }
            
            if (!lineType) {
                console.log('No LineType found with any method');
                throw new Error('LineType not found');
            }
            
            return lineType;
        } catch (error) {
            console.log("LineType not found:", error);
            throw new Error('LineType not found');
        }
    }
    async GetLineTypeByCode(code: string) {
        return await this.model.find({ code: code }).lean();
    }
}
