import { Recipe } from '~/server/models/recipe';
import { ErrorPrefix } from '~/types/error';
import { checkParam, handleCatchError } from '~/server/utils/api';
import status from 'http-status';

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');
        const body = await readBody(event);

        const allowedFields = ['name', 'ingredients', 'notes'];

        const updateData: Partial<Record<string, any>> = {};
        for (const key of allowedFields) {
            if (key in body) {
                updateData[key] = body[key];
            }
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, { new: true }).populate(
            'ingredients.ingredient',
        );

        return {
            updatedRecipe,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error updating recipe`, err);
    }
});
