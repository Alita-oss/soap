import {Recipe} from '~/server/models/recipe';
import { ErrorPrefix } from '~/types/error';
import status from "http-status";

export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params?.id;
        if (!id) {
            throw createError({
                message: `${ErrorPrefix.API} Missing recipe id`,
                statusCode: status.BAD_REQUEST,
            });
        } 

        const deleted = await Recipe.findByIdAndDelete(id);

        if (!deleted) {
            throw createError({
                message: `${ErrorPrefix.API} Recipe not found`,
                statusCode: status.NOT_FOUND,
            });
        }

        return {
            message: "Recipe successfully deleted",
            recipe: deleted,
        };

    } catch (err) {
        throw createError({
            message: `${ErrorPrefix.API} Error deleting recipe.`,
            statusCode: status.INTERNAL_SERVER_ERROR,
            data: { 
                rawError: err 
            },
        });
    };
});
