import { Ingredient } from "~/server/models/ingredient";
import { ErrorPrefix } from "~/types/error";
import status from "http-status";

export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params?.id;

        if (!id) {
            throw createError({
                message: `${ErrorPrefix.API} This id does not exist`,
                statusCode: status.BAD_REQUEST,
            });
        }

        const ingredient = await Ingredient.findById(id);
        if (!ingredient) {
            throw createError({
                message: `${ErrorPrefix.API} Ingredient not found`,
                statusCode: status.NOT_FOUND,
            });
        }

        return ingredient;

    } catch (err) {
        throw createError({
            message: `${ErrorPrefix.API} Failed to get ingredient by id.`,
            statusCode: status.INTERNAL_SERVER_ERROR,
            data: { 
                rawError: err 
            },
        });
    };
});
