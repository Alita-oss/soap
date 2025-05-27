import { Batch } from '~/server/models/batch';
import { ErrorPrefix, ErrorTypes } from '~/types/error';
import status from 'http-status';
import { handleCatchError } from '~/server/utils/api';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body.name || !body.recipe || !body.createdDate || !body.weightIns) {
            throw new Error(ErrorTypes[status.PRECONDITION_FAILED]);
        }

        const existingBatch = await Batch.findOne({
            name: body.name,
        });

        if (existingBatch) {
            throw new Error(ErrorTypes[status.CONFLICT]);
        }

        const batch = await Batch.create(body);
        return {
            batch,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error creating new batch`, err);
    }
});
