import type { Recipe } from './recipe';
import type { WeightIn } from './weightIn';

export type Batch = {
    _id: string;
    name: string;
    createdDate: Date;
    recipe: Recipe;
    weightIns: WeightIn[];
    barCount?: number;
};
