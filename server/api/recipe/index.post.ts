import status from 'http-status';
import { Recipe } from '~/server/models/recipe';
import { handleCatchError } from '~/server/utils/api';
import { ErrorPrefix, ErrorTypes } from '~/types/error';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body.name || !Array.isArray(body.ingredients) || body.ingredients.length === 0) {
            throw new Error(ErrorTypes[status.PRECONDITION_FAILED]);
        }

        const existingRecipe = await Recipe.findOne({
            name: body.name,
        });

        if (existingRecipe) {
            throw new Error(ErrorTypes[status.CONFLICT]);
        }

        const recipe = await Recipe.create(body);
        return {
            recipe,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error creating new recipe`, err);
    }
});
