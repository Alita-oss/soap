import { Ingredient } from '~/server/models/ingredient';
import { ErrorPrefix } from '~/types/error';
import { checkParam } from '~/server/utils/api';

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');
        const body = await readBody(event);

        const allowedFields = ['name', 'category', 'description', 'unit'];

        const updateData: Partial<Record<string, any>> = {};
        for (const key of allowedFields) {
            if (key in body) {
                updateData[key] = body[key];
            }
        }

        const updated = await Ingredient.findByIdAndUpdate(id, updateData, { new: true });

        return updated;
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error updating ingredient`, err);
    }
});
