import { Ingredient } from '~/server/models/ingredient';
import { ErrorPrefix } from '~/types/error';

export default defineEventHandler(async () => {
    try {
        const ingredients = await Ingredient.find();
        return ingredients;
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Failed to get all ingredients`, err);
    }
});
