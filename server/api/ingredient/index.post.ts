import status from 'http-status';
import { Ingredient } from '~/server/models/ingredient';
import { ErrorPrefix, ErrorTypes } from '~/types/error';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body.name || !body.unit || !body.category) {
            throw new Error('Missing required fields: name, unit or category');
        }

        const existingIngredient = await Ingredient.findOne({
            name: body.name,
        });

        if (existingIngredient) {
            throw new Error(`${ErrorTypes[status.BAD_REQUEST]}: Ingredient with this name already exists`);
        }

        const newIngredient = await Ingredient.create(body);
        return {
            newIngredient,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error creating new ingredient`, err);
    }
});
