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

        const body = await readBody(event);
        const { name, ingredients, notes } = body;

        if (!name) {
            throw createError({
                message: `${ErrorPrefix.API} Missing required field: name`,
                statusCode: status.BAD_REQUEST,
            });
        }

        if (!Array.isArray(ingredients) || ingredients.length === 0) {
            throw createError({
                message: `${ErrorPrefix.API} Ingredients are required and cannot be empty`,
                statusCode: status.BAD_REQUEST,
            });
        }

        for (const ing of ingredients) {
            if (!ing.ingredient || typeof ing.amount !== 'number') {
                throw createError({
                    message: `${ErrorPrefix.API} Each array of ingredients must have an ingredient and amount`,
                    statusCode: status.BAD_REQUEST,
                });
            }
        }

        const exists = await Recipe.findOne({ name, _id: { $ne: id } });
        if (exists) {
            throw createError({
                message: `${ErrorPrefix.API} Another recipe with this name already exists`,
                statusCode: status.CONFLICT,
            });
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate( id,
        { name, ingredients, notes },
        { new: true }
        );

        if (!updatedRecipe) {
            throw createError({
                message: `${ErrorPrefix.API} Recipe not found`,
                statusCode: status.NOT_FOUND,
            });
        }

        return updatedRecipe;

    } catch (err) {
        throw createError({
            message: `${ErrorPrefix.API} Error updating recipe`,
            statusCode: status.INTERNAL_SERVER_ERROR,
            data: { 
                rawError: err 
            },
        });
    }
});
