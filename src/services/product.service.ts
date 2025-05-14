import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongodb';

import { ProductDoc, ProductModel } from '../models/produit.model';
import { BaseService } from './base.service';

export class ProductService extends BaseService<ProductDoc> {
    constructor() {
        super(ProductModel);
    }
    async createProducts(productData: ProductDoc[]) {
        console.log("TEST")
        try {
            const productsId: Array<ObjectId> = [];
            for (const product of productData) {
                const productCode = `PROD-${uuidv4()}`;
                const id = (await this.model.find()).length + 1;
                const productBody = { ...product, id, code: productCode };
                const doc = new this.model(productBody);
                const savedProduct = await doc.save();
                productsId.push(savedProduct._id);
            }
            return productsId;
        } catch (error) {
            console.error('Une erreur est survenue :', error);
            throw new Error(error);
        }
    }
}
