import { Batch } from '~/server/models/batch';
import { ErrorPrefix, ErrorTypes } from '~/types/error';
import status from 'http-status';
import { checkParam, handleCatchError } from '~/server/utils/api';
import { Types } from 'mongoose';

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');

        if (!Types.ObjectId.isValid(id)) {
            throw new Error(ErrorTypes[status.NOT_FOUND]);
        }

        const batch = await Batch.findById(id).populate('recipe');

        return {
            batch,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Failed to get batch by id`, err);
    }
});
