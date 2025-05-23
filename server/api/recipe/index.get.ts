import {Recipe} from '~/server/models/recipe';
import { ErrorPrefix } from '~/types/error';
import status from "http-status";

export default defineEventHandler(async () => {
    try {
        const recipes = await Recipe.find().populate('ingredients.ingredient'); 
        return recipes;
    } catch (err) {
        throw createError({
            message: `${ErrorPrefix.API} Failed to get all recipes`,
            statusCode: status.INTERNAL_SERVER_ERROR,
            data: { 
                rawError: err 
            },
        });
    };
});
