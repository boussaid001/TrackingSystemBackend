import mongoose, { Document, Model } from 'mongoose';
import Joi from 'joi';

export interface FlashingStatusDoc extends Document {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    code: string;
    label: string;
    color: string;
}

const FlashingStatusSchema = new mongoose.Schema<FlashingStatusDoc>({
    id: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    code: String,
    label: String,
    color: String
});
export function validation(flashingstatus) {
    const schema = Joi.object({
        id: Joi.number(),
        code: Joi.string(),
        label: Joi.string(),
        color: Joi.string()
    });
    return schema.validate(flashingstatus);
}
export const FlashingStatusModel: Model<FlashingStatusDoc> = mongoose.model(
    'FlashingStatus',
    FlashingStatusSchema
);
