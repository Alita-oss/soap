import { defineMongooseModel } from '#nuxt/mongoose'
import type { Ingredient as IngredientType } from '~/types/ingredient';

export const Ingredient = defineMongooseModel<IngredientType>({
  name: 'Ingredient',
  schema: {
    name: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: String,
  },
});
