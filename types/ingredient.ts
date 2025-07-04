import type { Category } from './category';
import type { Unit } from './unit';

export type Ingredient = {
    _id: string;
    name: string;
    unit: Unit;
    category: Category;
    description?: string;
};

export type PopulatedIngredient = {
    ingredient: Ingredient;
    amount: number;
};
