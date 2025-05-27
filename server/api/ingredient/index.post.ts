import status from 'http-status';
import { Ingredient } from '~/server/models/ingredient';
import { handleCatchError } from '~/server/utils/api';
import { ErrorPrefix, ErrorTypes } from '~/types/error';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body.name || !body.unit || !body.category) {
            throw new Error(ErrorTypes[status.PRECONDITION_FAILED]);
        }

        const existingIngredient = await Ingredient.findOne({
            name: body.name,
        });

        if (existingIngredient) {
            throw new Error(ErrorTypes[status.CONFLICT]);
        }

        const ingredient = await Ingredient.create(body);
        return {
            ingredient,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error creating new ingredient`, err);
    }
});
