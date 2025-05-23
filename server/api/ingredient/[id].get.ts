import { Ingredient } from "~/server/models/ingredient";
import { ErrorPrefix } from "~/types/error";
import { checkParam } from "~/server/utils/api";

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');

        const ingredient = await Ingredient.findById(id);

        return ingredient;
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Failed to get ingredient by id`, err);
    };
});
