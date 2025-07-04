import { Ingredient } from '~/server/models/ingredient';
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

        const ingredient = await Ingredient.findById(id);
        console.log('ingredient: ', ingredient);

        return {
            ingredient,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Failed to get ingredient by id`, err);
    }
});
