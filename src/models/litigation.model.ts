import Joi from 'joi';
import mongoose, { Document, Model } from 'mongoose';

import { ReasonEnum } from '../common/enum/reason.enum';
import { TypeEnum } from '../common/enum/type.enum';

export interface LitigationDocument extends Document {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    comment: string;
    reason: typeof ReasonEnum;
    traceabilityID: number;
    step: number;
    type: typeof TypeEnum;
}

const LitigationSchema = new mongoose.Schema<LitigationDocument>({
    id: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    comment: String,
    reason: { type: String, enum: ReasonEnum, required: true },
    traceabilityID: Number,
    step: Number,
    type: { type: String, enum: TypeEnum }
});

export function validation(litigations) {
    const schema = Joi.array()
        .items(
            Joi.object({
                id: Joi.number(),
                comment: Joi.string(),
                reason: Joi.string()
                    .valid('Casse transport', 'Teinte', 'Manquant', 'Taches')
                    .required(),
                traceabilityID: Joi.number(),
                step: Joi.number(),
                type: Joi.string()
                    .valid('Magasin', 'Fournisseur', 'Livreur', 'Entrepôt')
                    .required()
            })
        )
        .required();

    return schema.validate(litigations);
}

LitigationSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: new Date() });
    next();
});

export const LitigationModel: Model<LitigationDocument> = mongoose.model(
    'Litigation',
    LitigationSchema
);
