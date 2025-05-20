import { defineMongooseModel } from '#nuxt/mongoose'

export const Ingredient = defineMongooseModel({
  name: 'Ingredient',
  schema: {
    name: String,
    unit: String
  },
});
