import { Ingredient } from "~/server/models/ingredient";
import { ErrorPrefix } from "~/types/error";
import status from "http-status";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body.name || !body.unit || !body.category) {
            throw createError({
                message: `${ErrorPrefix.API} Missing required fields: name, unit or category`,
                statusCode: status.BAD_REQUEST,
            });
        }

        const existingIngredient = await Ingredient.findOne({
            name: body.name,
        });

        if (existingIngredient) {
            throw createError({
                message: `${ErrorPrefix.API} Ingredient with this name already exists`,
                statusCode: status.CONFLICT,
            });
        }

        const newIngredient = await Ingredient.create(body);
        return newIngredient;
        
    } catch (err){
        throw createError({
            message: `${ErrorPrefix.API} Error creating new ingredient`,
            statusCode: status.INTERNAL_SERVER_ERROR,
            data: {
                rawError: err,
            },
        });
    };
});
