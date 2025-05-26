import { Recipe } from '~/server/models/recipe';
import { ErrorPrefix } from '~/types/error';
import { checkParam, handleCatchError } from '~/server/utils/api';
import status from 'http-status';

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');

        const recipe = await Recipe.findById(id).populate('ingredients.ingredient');

        return {
            recipe,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Failed to get recipe by id`, err);
    }
});
