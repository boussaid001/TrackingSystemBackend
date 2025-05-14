import mongoose, { Document, Model } from 'mongoose';
import Joi from 'joi';

import { TraceabilityTypeEnum } from '../common/enum/traceability-type.enum';

export interface PackageDocument extends Document {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    bareCode: string;
    code: string;
    codeCourse: string;
    label: string;
    lastMsgId: string;
    quantity: number;
    sequenceNumber: number;
    storeCmdNumber: number;
    storeNumber: number;
    traceabilityType: typeof TraceabilityTypeEnum;
    lineTypeID: mongoose.Schema.Types.ObjectId;
    groupeId: string;
    receptionNumber: number;
    supplier: string;
    warehouseId: string;
    receptionType: string;
    freightId: string;
    height: number;
    length: number;
    volume: number;
    weight: number;
    width: number;
    sku: string;
    traceabilities: [mongoose.Schema.Types.ObjectId];
    products: [mongoose.Schema.Types.ObjectId];
}

const packageSchema = new mongoose.Schema<PackageDocument>({
    id: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    bareCode: String,
    code: String,
    codeCourse: String,
    label: String,
    lastMsgId: String,
    quantity: Number,
    sequenceNumber: Number,
    storeCmdNumber: Number,
    storeNumber: Number,
    traceabilityType: {
        type: String,
        enum: Object.values(TraceabilityTypeEnum),
        required: true
    },
    lineTypeID: { type: mongoose.Schema.Types.ObjectId, ref: 'LineType' },
    groupeId: String,
    receptionNumber: Number,
    supplier: String,
    warehouseId: String,
    receptionType: String,
    freightId: String,
    height: Number,
    length: Number,
    volume: Number,
    weight: Number,
    width: Number,
    sku: String,
    traceabilities: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Traceability' }
    ],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

export function validation(Package) {
    const schema = Joi.object({
        id: Joi.number(),
        bareCode: Joi.string(),
        code: Joi.string(),
        codeCourse: Joi.number(),
        label: Joi.string(),
        lastMsgId: Joi.string(),
        quantity: Joi.number(),
        sequenceNumber: Joi.number(),
        storeCmdNumber: Joi.number(),
        storeNumber: Joi.number(),
        traceabilityType: Joi.string().valid('E', 'F', 'P').default('E'),
        lineTypeID: Joi.number(),
        groupeId: Joi.string(),
        receptionNumber: Joi.number(),
        supplier: Joi.string(),
        warehouseId: Joi.string(),
        receptionType: Joi.string(),
        freightId: Joi.string(),
        height: Joi.number(),
        length: Joi.number(),
        volume: Joi.number(),
        weight: Joi.number(),
        width: Joi.number(),
        sku: Joi.string()
    });
    return schema.validate(Package);
}
packageSchema.pre('updateOne', function (next) {
    this.set({ updatedAt: new Date() });
    next();
});

export const PackageModel: Model<PackageDocument> = mongoose.model(
    'Package',
    packageSchema
);
