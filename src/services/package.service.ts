import { v4 as uuidv4 } from 'uuid';
import { FilterQuery } from 'mongoose';

import { BaseService } from './base.service';
import { PackageDocument, PackageModel } from '../models/package.model';

export class PackageService extends BaseService<PackageDocument> {
    constructor() {
        super(PackageModel);
    }
    async create(pacakageDocument: PackageDocument): Promise<PackageDocument> {
        try {
            const packageCode = `PKG-${uuidv4()}`;
            const id = (await this.findAll()).length + 1;
            const packageBody = { ...pacakageDocument, id, code: packageCode };
            const doc = new this.model(packageBody);
            return await doc.save();
        } catch (error) {
            console.error('Error when creating doc:', error);
            throw new Error('Error when creting doc', error);
        }
    }

    async findPackageById(packageId: number): Promise<PackageDocument | null> {
        try {
            return await this.model.findOne({ id: packageId });
        } catch (error) {
            throw new Error('Package not found');
        }
    }

    async getpackagesByFilter(req) {
        const { limit, offset, ...filter } = req.body;
        try {
           
            const searchQuery: FilterQuery<any> = {};
            if (filter.query) {
                
                const query = filter.query;
                console.log('query:', query);
                searchQuery.$or = [
                    {
                        bareCode: {
                            $regex: `.*${query}.*`,
                            $options: 'i'
                        }
                    },
                    { code: { $regex: `.*${query}.*`, $options: 'i' } },
                    {
                        codeCourse: {
                            $regex: `.*${query}.*`,
                            $options: 'i'
                        }
                    },
                    { label: { $regex: `.*${query}.*`, $options: 'i' } },
                    {
                        traceabilityType: {
                            $regex: `.*${query}.*`,
                            $options: 'i'
                        }
                    },
                   
                    {
                        groupeId: {
                            $regex: `.*${query}.*`,
                            $options: 'i'
                        }
                    },
                    {
                        supplier: {
                            $regex: `.*${query}.*`,
                            $options: 'i'
                        }
                    },
                    {
                        warehouseId: {
                            $regex: `.*${query}.*`,
                            $options: 'i'
                        }
                    },
                    {
                        receptionType: {
                            $regex: `.*${query}.*`,
                            $options: 'i'
                        }
                    },
                    {
                        freightId: {
                            $regex: `.*${query}.*`,
                            $options: 'i'
                        }
                    },
                    { sku: { $regex: `.*${query}.*`, $options: 'i' } }
                ];
            } 
            console.log('searchQuery:', JSON.stringify(searchQuery, null, 2));

            const packages = await PackageModel.find(searchQuery, {
                _id: 0,
                __v: 0
            })
            
                .skip(offset || 0)
                .limit(limit || 20)
                .lean()
                .populate("lineTypeID");

            return packages;
        } catch (error) {
            console.error('Error when getting packages:', error);
            return {
                error,
                message: 'Erreur lors de la récupération des packages'
            };
        }
    }
}
