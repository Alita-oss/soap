import {Recipe} from '~/server/models/recipe';

export default defineEventHandler(async (event) => {
    const { name } = await readBody(event);

    const recipe = new Recipe({
        name,
    });

    await recipe.save();

    return {
        success: true,
    };
});
