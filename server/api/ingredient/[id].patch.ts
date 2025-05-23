import { Ingredient } from "~/server/models/ingredient";
import { ErrorPrefix } from "~/types/error";
import status from "http-status";

export default defineEventHandler(async (event ) => {
    try {
        const id = event.context.params?.id;
        if (!id) {
            throw createError({
                statusCode: status.BAD_REQUEST,
                message: `${ErrorPrefix.API} Missing ingredient id`,
            });
        }
        const body = await readBody(event);
        const { name, unit, category, description } = body;

        if (!name || !unit || !category) {
            throw createError({
                message: `${ErrorPrefix.API} Missing required fields`,
                statusCode: status.BAD_REQUEST,
            });
        }

        const exists = await Ingredient.findOne({  name, _id: { $ne: id } });
        if (exists) {
            throw createError({
                message: `${ErrorPrefix.API} Another ingredient with this name already exists`,
                statusCode: status.CONFLICT,
            });
        }
    
        const updated = await Ingredient.findByIdAndUpdate( id,
            { name, unit, category, description },
            { new: true }
        );

        if (!updated) {
            throw createError({
                message: `${ErrorPrefix.API} Ingredient not found`,
                statusCode: status.NOT_FOUND,
            });
        }

        return updated;

    } catch (err) {
        throw createError({
            message: `${ErrorPrefix.API} Error updating ingredient.`,
            statusCode: status.INTERNAL_SERVER_ERROR,
            data: { 
                rawError: err 
            },
        });
    };
});

