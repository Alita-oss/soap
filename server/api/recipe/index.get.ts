import status from 'http-status';
import { Recipe } from '~/server/models/recipe';
import { handleCatchError } from '~/server/utils/api';
import { ErrorPrefix } from '~/types/error';

export default defineEventHandler(async () => {
    try {
        const recipes = await Recipe.find().populate('ingredients.ingredient');
        return {
            recipes,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Failed to get all recipes`, err);
    }
});
