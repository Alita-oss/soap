import {Recipe} from '~/server/models/recipe';

export default defineEventHandler(async (event) => {
const recipes = await Recipe.find(); 
    

    return {
        success: true,
        recipes
    };
});
