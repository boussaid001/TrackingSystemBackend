import mongoose, { Document, Model } from 'mongoose';
import Joi from 'joi';

import { SourceEnum } from '../common/enum/source.enum';

// TODO: Change Referencement litigationID, packageId
export interface TraceabilityDoc extends Document {
    id: number;
    createdAt: Date;
    flashedAt: Date;
    litigationId: mongoose.Schema.Types.ObjectId;
    flashingStatusId: string;
    step: number;
    chauffeurId: number;
    collabId: number;
    source: typeof SourceEnum;
    codeRayon: string;
    comment: string;
    packageId: mongoose.Schema.Types.ObjectId;
}
const TraceabilitySchema = new mongoose.Schema<TraceabilityDoc>({
    id: Number,
    createdAt: { type: Date, default: Date.now },
    flashedAt: { type: Date, default: Date.now },
    litigationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Litigation' },
    flashingStatusId: Number,
    step: Number,
    chauffeurId: Number,
    collabId: Number,
    source: { type: String, enum: Object.values(SourceEnum), required: true },
    codeRayon: String,
    comment: String,
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' }
});

export function validateTraceability(taceability) {
    const schema = Joi.object({
        id: Joi.number(),
        litigationId: Joi.string(),
        flashingStatusId: Joi.number(),
        step: Joi.number(),
        chauffeurId: Joi.number(),
        collabId: Joi.number(),
        source: Joi.string()
            .valid(
                'Cloture',
                'Groupe',
                'Forest',
                'ScanLog',
                'Inheritance',
                'Corner'
            )
            .default('Cloture'),
        codeRayon: Joi.string(),
        comment: Joi.string(),
        packageId: Joi.string()
    });

    return schema.validate(taceability);
}

export const TraceabilityModel: Model<TraceabilityDoc> = mongoose.model(
    'Traceability',
    TraceabilitySchema
);
