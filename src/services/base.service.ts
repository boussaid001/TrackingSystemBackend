import { Model, Document } from 'mongoose';

import { UpdateMethodEnum } from '../common/enum/update.method.enum';

export abstract class BaseService<T extends Document> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async create(data: any): Promise<T> {
        try {
            console.log('🚀 ~ BaseService<T ~ create ~ create:', this.model);
            const id = (await this.findAll()).length + 1;
            const doc = new this.model({ id, ...data });
            console.log(
                '👊 ~ file: base.service.ts:17 ~ BaseService<T ~ create ~ doc:',
                doc
            );
            return await doc.save();
        } catch (error) {
            throw new Error('Error when creating doc', error);
        }
    }

    async update(id: string, data: any, method: string): Promise<T | null> {
        console.log(`🚀 ~ BaseService<T ~ update ~ ${method}:`, this.model);
        method === UpdateMethodEnum.SOFT_DELETE
            ? (data.deletedAt = new Date())
            : method === UpdateMethodEnum.RE_ACTIVE
              ? (data.deletedAt = null)
              : ((data.deletedAt = null), (data.updatedAt = new Date()));
        return await this.model.findOneAndUpdate({ id }, data, { new: true });
    }

    async findOneById(id: number): Promise<T | null> {
        console.log('🚀 ~ BaseService<T ~ findById ~ findById:', this.model);
        return await this.model.findOne({ id: id }, { _id: 0, __v: 0 });
    }

    async findAll(): Promise<T[] | []> {
        console.log('🚀 ~ BaseService<T ~ findAll ~ findAll:', this.model);
        return await this.model.find({});
    }
}
