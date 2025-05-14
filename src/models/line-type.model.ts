import mongoose, { Document, Model } from 'mongoose';
import Joi from 'joi';

export interface LineTypeDoc extends Document {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    code: string;
    label: string;
    color: string;
}

const LineTypeSchema = new mongoose.Schema<LineTypeDoc>({
    id: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    code: String,
    label: String,
    color: String
});

export function validation(linetype) {
    const schema = Joi.object({
        id: Joi.number(),
        code: Joi.string().required(),
        label: Joi.string().required(),
        color: Joi.string().required()
    });
    return schema.validate(linetype);
}

LineTypeSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: new Date() });
    next();
});

export const LineTypeModel: Model<LineTypeDoc> = mongoose.model(
    'LineType',
    LineTypeSchema
);
