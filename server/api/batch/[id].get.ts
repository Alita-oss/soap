import { Batch } from '~/server/models/batch';
import { ErrorPrefix } from '~/types/error';
import status from 'http-status';
import { checkParam, handleCatchError } from '~/server/utils/api';

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');

        const batch = await Batch.findById(id).populate('recipe');

        return {
            batch,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Failed to get batch by id`, err);
    }
});
