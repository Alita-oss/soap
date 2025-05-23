import { Recipe } from '~/server/models/recipe';
import { ErrorPrefix } from '~/types/error';

export default defineEventHandler(async () => {
    try {
        const recipes = await Recipe.find().populate('ingredients.ingredient');
        return recipes;
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Failed to get all recipes`, err);
    }
});
