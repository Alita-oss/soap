import { Ingredient } from '~/server/models/ingredient';
import { ErrorPrefix } from '~/types/error';

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
            throw new Error('Ingredient with this name already exists');
        }

        const newIngredient = await Ingredient.create(body);
        return newIngredient;
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error creating new ingredient`, err);
    }
});
