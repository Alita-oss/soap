import { defineMongooseModel } from '#nuxt/mongoose';
import { Types } from 'mongoose';

export const Recipe = defineMongooseModel({
  name: 'Recipe',
  schema: {
    ingredients: {
        type: Types.ObjectId,
        ref: 'Ingredient',
    },
    name: String,
  },
});
