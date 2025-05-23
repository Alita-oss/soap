import { Ingredient } from "~/server/models/ingredient";
import { ErrorPrefix } from "~/types/error";
import status from "http-status";

export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params?.id;
        if (!id) {
            throw createError({
                message: `${ErrorPrefix.API} Missing ingredient id`,
                statusCode: status.BAD_REQUEST,
            });
        } 

        const deleted = await Ingredient.findByIdAndDelete(id);

        if (!deleted) {
            throw createError({
                message: `${ErrorPrefix.API} Ingredient not found`,
                statusCode: status.NOT_FOUND,
            });
        }

        return {
            message: "Ingredient successfully deleted",
            ingredient: deleted,
        };

    } catch (err) {
        throw createError({
            message: `${ErrorPrefix.API} Error deleting ingredient.`,
            statusCode: status.INTERNAL_SERVER_ERROR,
            data: { 
                rawError: err 
            },
        });
    };
});
