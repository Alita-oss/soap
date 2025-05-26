import status from 'http-status';
import { Ingredient } from '~/server/models/ingredient';
import { ErrorPrefix } from '~/types/error';

export default defineEventHandler(async () => {
    try {
        const ingredients = await Ingredient.find();
        return {
            ingredients,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Failed to get all ingredients`, err);
    }
});
