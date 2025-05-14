import mongoose, { Document, Model } from 'mongoose';
import Joi from 'joi';

export interface PictureDoc extends Document {
    id: string;
    createdAt: Date;
    url: string;
    traceabilityId: string;
    litigationId: string;
    fileName: string;
}
const PictureSchema = new mongoose.Schema<PictureDoc>({
    id: String,
    createdAt: { type: Date, default: Date.now },
    url: String,
    traceabilityId: String,
    litigationId: String,
    fileName: String
});

export function validation(picture) {
    const schema = Joi.object({
        id: Joi.string(),
        url: Joi.string(),
        traceabilityId: Joi.string(),
        litigationId: Joi.string(),
        fileName: Joi.string()
    });
    return schema.validate(picture);
}
export const PictureModel: Model<PictureDoc> = mongoose.model(
    'Picture',
    PictureSchema
);
