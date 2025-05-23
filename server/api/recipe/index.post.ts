import {Recipe} from '~/server/models/recipe';
import { ErrorPrefix } from '~/types/error';
import status from "http-status";


export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body.name) {
            throw createError({
                message: `${ErrorPrefix.API} Missing required fields: name`,
                statusCode: status.BAD_REQUEST,
            });
        }

        if (!Array.isArray(body.ingredients) || body.ingredients.length === 0) {
            throw createError({
                message: `${ErrorPrefix.API} There are missing ingredients`,
                statusCode: status.BAD_REQUEST,
            });
        }

        for (const ing of body.ingredients) {
            if (!ing.ingredient || typeof ing.amount !== 'number') {
                throw createError({
                    message: `${ErrorPrefix.API} Each array of ingredients must have ingredient and amount`,
                    statusCode: status.BAD_REQUEST,
                });
            }
        }

        const existingRecipe = await Recipe.findOne({
            name: body.name,
        });

        if (existingRecipe) {
            throw createError({
                message: `${ErrorPrefix.API} Recipe with this name already exists`,
                statusCode: status.CONFLICT,
            });
        }

        const newRecipe = await Recipe.create(body);
        return newRecipe;
        
    } catch (err) {
        throw createError({
            message: `${ErrorPrefix.API} Error creating new recipe`,
            statusCode: status.INTERNAL_SERVER_ERROR,
            data: {
                rawError: err,
            },
        });
    };
});
