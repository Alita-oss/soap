import { Recipe } from '~/server/models/recipe';
import { ErrorPrefix } from '~/types/error';
import { checkParam } from '~/server/utils/api';

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');

        const body = await readBody(event);
        const { name, ingredients, notes } = body;

        if (!name) {
            throw new Error('Missing required field: name');
        }

        if (!Array.isArray(ingredients) || ingredients.length === 0) {
            throw new Error('Ingredients are required and cannot be empty');
        }

        for (const ing of ingredients) {
            if (!ing.ingredient || typeof ing.amount !== 'number') {
                throw new Error('Each array of ingredients must have an ingredient and amount');
            }
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(id, { name, ingredients, notes }, { new: true });

        if (!updatedRecipe) {
            throw new Error('Recipe not found');
        }

        return updatedRecipe;
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error updating recipe`, err);
    }
});
