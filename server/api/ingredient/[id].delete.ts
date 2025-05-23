import { Ingredient } from "~/server/models/ingredient";
import { ErrorPrefix } from "~/types/error";
import status from "http-status";
import { checkParam } from "~/server/utils/api";

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');

        await Ingredient.findByIdAndDelete(id);

        return {
            statusCode: status.OK,
        };

    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error deleting ingredient`, err);
    };
});
