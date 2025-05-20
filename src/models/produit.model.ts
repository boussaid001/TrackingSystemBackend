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
        id: Joi.number().optional(),
        code: Joi.string().required(),
        label: Joi.string().required(),
        volume: Joi.number().optional(),
        weight: Joi.number().optional(),
        packageId: Joi.string().optional(),
        typology: Joi.string()
            .valid(
                'TYPOLOGY_GENERIC',
                'TYPOLOGY_FRESH',
                'TYPOLOGY_FROZEN',
                'TYPOLOGY_DANGEROUS',
                'TYPOLOGY_VOLUMINOUS',
                'TYPOLOGY_FRAGILE',
                'TYPOLOGY_VOLUMINOUS_FRAGILE'
            )
            .default('TYPOLOGY_GENERIC'),
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
