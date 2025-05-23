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

        const recipe = await Recipe.findById(id);
        if (!recipe) {
            throw createError({
                message: `${ErrorPrefix.API} Recipe not found`,
                statusCode: status.NOT_FOUND,
            });
        }

        return recipe;

    } catch (err) {
        throw createError({
            message: `${ErrorPrefix.API} Failed to get recipe by id.`,
            statusCode: status.INTERNAL_SERVER_ERROR,
            data: { 
                rawError: err 
            },
        });
    };
});
