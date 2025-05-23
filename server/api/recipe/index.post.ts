import { Recipe } from '~/server/models/recipe';
import { ErrorPrefix } from '~/types/error';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body.name) {
            throw new Error('Missing required fields: name');
        }

        if (!Array.isArray(body.ingredients) || body.ingredients.length === 0) {
            throw new Error('There are missing ingredients');
        }

        for (const ing of body.ingredients) {
            if (!ing.ingredient || typeof ing.amount !== 'number') {
                throw new Error('Each array of ingredients must have ingredient and amount');
            }
        }

        const existingRecipe = await Recipe.findOne({
            name: body.name,
        });

        if (existingRecipe) {
            throw new Error('Recipe with this name already exists');
        }

        const newRecipe = await Recipe.create(body);
        return newRecipe;
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error creating new recipe`, err);
    }
});
