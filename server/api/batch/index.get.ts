import { Batch } from '~/server/models/batch';
import { ErrorPrefix } from '~/types/error';
import status from 'http-status';
import { handleCatchError } from '~/server/utils/api';

export default defineEventHandler(async () => {
    try {
        const batches = await Batch.find().populate('recipe');
        return {
            batches,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Failed to get all batches`, err);
    }
});
