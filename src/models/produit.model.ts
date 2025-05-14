import mongoose, { Document, Model } from 'mongoose';
import Joi from 'joi';

import { TypologyEnum } from '../common/enum/typology.enum';
import { StateEnum } from '../common/enum/state.enum';

export interface ProductDoc extends Document {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    code: string;
    label: string;
    volume: number;
    weight: number;
    typology: typeof TypologyEnum;
    state: typeof StateEnum;
    packageId: mongoose.Schema.Types.ObjectId;
}

const ProductSchema = new mongoose.Schema<ProductDoc>({
    id: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    code: String,
    label: String,
    volume: Number,
    weight: Number,
    typology: {
        type: String,
        enum: Object.values(TypologyEnum),
        required: true
    },
    state: { type: String, enum: Object.values(StateEnum), required: true },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' }
});

export function validationt(product) {
    const schema = Joi.object({
        id: Joi.number(),
        code: Joi.string(),
        label: Joi.string(),
        volume: Joi.number(),
        weight: Joi.number(),
        packageId: Joi.string(),
        typology: Joi.string()
            .valid(
                'TUPOLOGY_GENERIC',
                'TUPOLOGY_FRESH',
                'TUPOLOGY_FROZEN',
                'TUPOLOGY_DANGEROUS',
                'TUPOLOGY_VOLUMINOUS',
                'TUPOLOGY_FRAGILE',
                'TUPOLOGY_VOLUMINOUS_FRAGILE'
            )
            .default('TUPOLOGY_GENERIC'),
        state: Joi.string()
            .valid(
                'Fonctionnel',
                'Réparable',
                'Bon pour recyclage',
                'ORIG_PACK',
                'DAMAGE',
                'ASSEMBLED'
            )
            .default('Fonctionnel')
    });
    return schema.validate(product);
}

export const ProductModel: Model<ProductDoc> = mongoose.model(
    'Product',
    ProductSchema
);
