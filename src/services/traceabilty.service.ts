import { ObjectId } from 'mongodb';
import moment from 'moment';

import {
    TraceabilityDoc,
    TraceabilityModel
} from '../models/traceability.model';
import { BaseService } from './base.service';

export class TraceabilityService extends BaseService<TraceabilityDoc> {
    constructor() {
        super(TraceabilityModel);
    }

    // async addTraceability(traceability): Promise<any> {
    //     const id = (await this.findAll()).length + 1;
    //     const doc = new this.model({
    //         id,
    //         ...traceability
    //     });
    //     return await doc.save();
    // }
    async getTracabilities(param): Promise<TraceabilityDoc[] | []> {
        let criteria;
        if (param.packageId) {
            criteria = { packageId: param.packageId };
        } else if (param.userId) {
            const userId = parseInt(param.userId);
            criteria = {
                $or: [{ chauffeurId: userId }, { collabId: userId }]
            };
        } else if (param.flashedAt) {
            const flashedAtDate = moment(param.flashedAt, 'YYYY-MM-DD');
            const startOfDay = flashedAtDate.startOf('day').format();
            const endOfDay = flashedAtDate.endOf('day').format();

            criteria = {
                flashedAt: { $gte: startOfDay, $lte: endOfDay }
            };
        } else {
            return [];
        }
        return await this.model.find(criteria, { _id: 0, __v: 0 });
    }
    // async getTracabiliteByPackage(packageId: ObjectId) {
    //     const tracabilites = await this.model.find({ packageId: packageId });
    //     return tracabilites;
    // }

    // // Find a better way that can accepton ly one generic param for this 3 functions
    // async GetTraceabilityByUser(
    //     userId: number
    // ): Promise<TraceabilityDoc[] | []> {
    //     return await this.model.find({
    //         $or: [{ chauffeurId: userId }, { collabId: userId }]
    //     });
    // }

    // async getTraceabilityByFlashinDate(flashedAt: Date) {
    //     return await this.model.find({ flashedAt: flashedAt });
    // }

    async findTraceability(step: number, packageId: ObjectId) {
        const exist = await this.model.find({
            $and: [{ step: step }, { packageId: packageId }]
        });
        return exist;
    }
}
