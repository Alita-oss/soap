import { Batch } from '~/server/models/batch';
import { ErrorPrefix } from '~/types/error';
import status from 'http-status';
import { checkParam, handleCatchError } from '~/server/utils/api';

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');
        const body = await readBody(event);

        const allowedFields = ['name', 'createdDate', 'recipe', 'weightIns', 'barCount'];

        const updateData: Partial<Record<string, any>> = {};
        for (const key of allowedFields) {
            if (key in body) {
                updateData[key] = body[key];
            }
        }

        const updatedBatch = await Batch.findByIdAndUpdate(id, updateData, { new: true });

        return {
            updatedBatch,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error updating batch`, err);
    }
});
