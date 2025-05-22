import type { Ingredient } from "./ingredient";

export type Recipe = {
    _id: string;
    name: string;
    ingredients: {
        ingredient: Ingredient,
        amount: number,
    }[];
    notes?: string[],
};
