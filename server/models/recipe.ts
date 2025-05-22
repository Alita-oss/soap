import { defineMongooseModel } from '#nuxt/mongoose';
import { Types } from 'mongoose';
import type { Recipe as RecipeType } from '~/types/recipe';

export const Recipe = defineMongooseModel<RecipeType>({
  name: 'Recipe',
  schema: {
    name: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        ingredient: {
          type: Types.ObjectId,
          ref: 'Ingredient',
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    notes: [String],
  },
});
