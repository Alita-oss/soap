import { Recipe } from '~/server/models/recipe';
import { ErrorPrefix, ErrorTypes } from '~/types/error';
import { checkParam, handleCatchError } from '~/server/utils/api';
import status from 'http-status';
import { Types } from 'mongoose';

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');

        if (!Types.ObjectId.isValid(id)) {
            throw new Error(ErrorTypes[status.NOT_FOUND]);
        }

        const recipe = await Recipe.findById(id).populate({ path: 'ingredients', populate: { path: 'ingredient' } });

        return {
            recipe,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Failed to get recipe by id`, err);
    }
});
