import {Recipe} from '~/server/models/recipe';
import { ErrorPrefix } from '~/types/error';
import status from "http-status";


export default defineEventHandler(async (event) => {
    /*const { name } = await readBody(event);
    const recipe = new Recipe({
        name,
    });
    await recipe.save();
    return {
        success: true,
    };*/

    try {
        const id = event.context.params?.id; //for all
        
    }catch (err) {
        throw createError({
            message: `${ErrorPrefix.API} Error creating new recipe`,
            statusCode: status.INTERNAL_SERVER_ERROR,
            data: {
                rawError: err,
            },
        });
    };
});
