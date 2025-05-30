<template>
    <SForm :disabled="submitDisabled" @cta="handleSubmit">
        <SInput key="recipe-name" v-model="computedName">
            <template #label>Recipe name</template>
        </SInput>

        <ul>
            <li v-for="(item, index) in ingredients" :key="index">
                {{ item.name }} – {{ item.amount }} {{ item.unit }}
            </li>
        </ul>

        <SButton v-if="!showIngredientForm" @click="showIngredientForm = true">Add ingredient</SButton>

        <SAddIngredient v-if="showIngredientForm" :ingredient-options="ingredientOptions" @add="handleAddIngredient" />
    </SForm>
</template>

<script setup lang="ts">
import SAddIngredient from '~/components/SAddIngredient.vue';
import type { Ingredient, PopulatedIngredient } from '~/types/ingredient';

const emit = defineEmits<{
    (event: 'submit'): void;
    (event: 'addIngredient', value: { ingredient: Ingredient; amount: number }): void;
    (event: 'update:name', value: string): void;
}>();

const props = defineProps<{
    name: string;
    ingredients: PopulatedIngredient[];
}>();

const computedName = computed({
    get: () => props.name,
    set: (value) => {
        emit('update:name', value);
    },
});
const ingredients = computed(() =>
    props.ingredients.map(({ ingredient, amount }) => {
        const found = ingredientOptions.value.find(({ value }) => value === ingredient._id);

        return {
            _id: ingredient,
            name: found?.text,
            amount,
            unit: found?.unit,
        };
    }),
);

type GetIngredientResponse = { ingredients: Ingredient[]; statusCode: number };

const showIngredientForm = ref(false);
const allIngredients: GetIngredientResponse = await $fetch('/api/ingredient');

const transformIngredientDataToOptions = (
    data: GetIngredientResponse,
): { value: string; text: string; unit: string }[] => {
    if (!data?.ingredients || !Array.isArray(data.ingredients)) {
        return [];
    }

    return data.ingredients.map((ingredient) => ({
        value: ingredient._id,
        text: `${ingredient.name} (${ingredient.unit})`,
        unit: ingredient.unit,
    }));
};
const ingredientOptions = ref(transformIngredientDataToOptions(allIngredients));

const handleAddIngredient = (data: { _id: string; amount: number }) => {
    const found = allIngredients?.ingredients.find((ingr) => ingr._id === data._id);
    if (!found) return;

    emit('addIngredient', {
        ingredient: found,
        amount: data.amount,
    });

    showIngredientForm.value = false;
};

const submitDisabled = computed(() => Boolean(!computedName.value || ingredients.value.length === 0));

const handleSubmit = () => {
    if (submitDisabled.value) return;
    emit('submit');
};
</script>
