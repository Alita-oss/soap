import status from 'http-status';
import { Recipe } from '~/server/models/recipe';
import { ErrorPrefix, ErrorTypes } from '~/types/error';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body.name || !Array.isArray(body.ingredients) || body.ingredients.length === 0) {
            throw new Error('Missing required fields: name or ingredients');
        }

        for (const ing of body.ingredients) {
            if (!ing.ingredient || typeof ing.amount !== 'number') {
                throw new Error('Each ingredient must include both ingredient and amount');
            }
        }

        const existingRecipe = await Recipe.findOne({
            name: body.name,
        });

        if (existingRecipe) {
            throw new Error(`${ErrorTypes[status.BAD_REQUEST]}: Recipe with this name already exists`);
        }

        const newRecipe = await Recipe.create(body);
        return {
            newRecipe,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error creating new recipe`, err);
    }
});
