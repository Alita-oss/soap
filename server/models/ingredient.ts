import { Schema, model } from 'mongoose';
import type { Ingredient as IngredientType } from '~/types/ingredient';

const ingredientSchema = new Schema<IngredientType>({
    name: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: String,
});

export const Ingredient = model<IngredientType>('Ingredient', ingredientSchema);
