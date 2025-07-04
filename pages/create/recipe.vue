<template>
    <RecipeForm
        :name="name"
        :ingredients="ingredients"
        @add-ingredient="handleAddIngredient"
        @update:name="name = $event"
        @submit="handleSubmit"
    />
</template>

<script setup lang="ts">
import type { PopulatedIngredient } from '~/types/ingredient';

const name = ref('');
const ingredients = ref<PopulatedIngredient[]>([]);

const handleSubmit = async () => {
    const body = {
        name: name.value,
        ingredients: ingredients.value.map(({ ingredient, amount }) => ({ amount, ingredient: ingredient._id })),
    };

    const res = await $fetch('/api/recipe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    });

    console.log('res: ', res);
};

const handleAddIngredient = (data: PopulatedIngredient) => {
    ingredients.value.push(data);
};
</script>
