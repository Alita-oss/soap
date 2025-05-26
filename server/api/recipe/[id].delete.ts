import { Recipe } from '~/server/models/recipe';
import { ErrorPrefix } from '~/types/error';
import status from 'http-status';
import { checkParam, handleCatchError } from '~/server/utils/api';

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');

        await Recipe.findByIdAndDelete(id);

        return {
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error deleting recipe`, err);
    }
});
