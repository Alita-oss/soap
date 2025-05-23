import { Ingredient } from "~/server/models/ingredient";
import { ErrorPrefix } from "~/types/error";
import status from "http-status";

export default defineEventHandler(async () => {
  try {
        const ingredients = await Ingredient.find();
        return ingredients;

    } catch (err) {
        throw createError({
            message: `${ErrorPrefix.API} Failed to get all ingredients`,
            statusCode: status.INTERNAL_SERVER_ERROR,
            data: { 
                rawError: err 
            },
        });
  };
});
