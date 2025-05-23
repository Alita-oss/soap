import { Types, Schema, model } from 'mongoose';
import type { Recipe as RecipeType } from '~/types/recipe';

const recipeSchema = new Schema<RecipeType>({
    name: {
        type: String,
        required: true,
    },
    ingredients: [
        {
            ingredient: {
                type: Types.ObjectId,
                ref: 'Ingredient',
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
        },
    ],
    notes: [String],
});

export const Recipe = model<RecipeType>('Recipe', recipeSchema);
