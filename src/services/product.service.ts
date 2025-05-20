import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

import { ProductDoc, ProductModel } from '../models/produit.model';
import { BaseService } from './base.service';

export class ProductService extends BaseService<ProductDoc> {
    constructor() {
        super(ProductModel);
    }
    async createProducts(productData: any[]) {
        console.log("Creating products:", productData);
        try {
            const createdProducts: Array<Document<unknown, {}, ProductDoc> & ProductDoc & { _id: ObjectId }> = [];
            for (const product of productData) {
                // Only generate a productCode if one isn't provided
                const productCode = product.code || `PROD-${uuidv4()}`;
                
                // Get the next ID
                const id = (await this.model.find()).length + 1;
                
                // Ensure typology is correct (TYPOLOGY_ not TUPOLOGY_)
                let typology = product.typology;
                if (typology && typology.startsWith('TUPOLOGY_')) {
                    typology = typology.replace('TUPOLOGY_', 'TYPOLOGY_');
                }
                
                // Create the product
                const productBody = { 
                    ...product, 
                    id, 
                    code: productCode,
                    typology: typology || 'TYPOLOGY_GENERIC'
                };
                
                console.log("Creating product with:", productBody);
                const doc = new this.model(productBody);
                const savedProduct = await doc.save();
                createdProducts.push(savedProduct);
            }
            return createdProducts;
        } catch (error) {
            console.error('Error creating products:', error);
            throw error;
        }
    }
}
