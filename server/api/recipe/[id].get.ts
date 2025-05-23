import { Recipe } from '~/server/models/recipe';
import { ErrorPrefix } from '~/types/error';
import { checkParam } from '~/server/utils/api';

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');

        const recipe = await Recipe.findById(id);

        if (!recipe) {
            throw new Error('Recipe not found');
        }

        return recipe;
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Failed to get recipe by id`, err);
    }
});
