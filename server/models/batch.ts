import { Types, Schema, model } from 'mongoose';
import type { Batch as BatchType } from '~/types/batch';

const batchSchema = new Schema<BatchType>({
    name: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        required: true,
    },
    recipe: {
        type: Types.ObjectId,
        ref: 'Recipe',
        required: true,
    },
    weightIns: [
        {
            weight: {
                type: Number,
                required: true,
            },
            date: {
                type: Date,
                required: true,
            },
        },
    ],
    barCount: Number,
});

export const Batch = model<BatchType>('Batch', batchSchema);
