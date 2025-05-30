<template>
    <h1>Recipe detail</h1>
    <pre>
        {{ data }}
    </pre>

    <SButton v-if="!updateRecipe" @click="updateRecipe = true">Edit Recipe</SButton>
    <SButton v-if="!deleteRecipe" @click="deleteRecipe = true">Delete Recipe</SButton>

    <RecipeForm
        v-if="updateRecipe && recipeForEdit"
        :name="recipeForEdit.name"
        :ingredients="recipeForEdit.ingredients"
        @add-ingredient="handleAddIngredient"
        @update:name="recipeForEdit.name = $event"
        @submit="handleUpdateSubmit"
    />

    <div v-if="deleteRecipe">
        <p>Are you sure you want to delete {{ recipeForEdit.name }}?</p>

        <SButton @click="deleteRecipe = false">Cancel</SButton>
        <SButton @click="handleDelete">Delete</SButton>
    </div>
</template>

<script setup lang="ts">
import status from 'http-status';
import type { PopulatedIngredient } from '~/types/ingredient';
import type { Recipe } from '~/types/recipe';

const route = useRoute();
const router = useRouter();
const { id } = route.params;
const { data, error, refresh } = await useFetch(`/api/recipe/${id}`);

if (error?.value) {
    throw createError({
        message: error.value.message,
        statusCode: error.value.statusCode,
        data: {
            rawError: error.value,
        },
        fatal: true,
    });
}

const updateRecipe = ref(false);
const deleteRecipe = ref(false);

const recipeForEdit = ref<Recipe>({ ...data.value?.recipe });

const handleAddIngredient = (data: PopulatedIngredient) => {
    recipeForEdit.value.ingredients.push(data);
};

const handleUpdateSubmit = async () => {
    const body = {
        name: recipeForEdit.value.name,
        ingredients: recipeForEdit.value.ingredients.map(({ ingredient, amount }) => ({
            amount,
            ingredient: ingredient._id,
        })),
    };

    const res = await $fetch(`/api/recipe/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    });

    await refresh();
    console.log('res: ', res);
    updateRecipe.value = false;
};

const handleDelete = async () => {
    const res = await $fetch(`/api/recipe/${id}`, {
        method: 'DELETE',
    });

    if (res?.statusCode === status.OK) {
        router.replace('/');
    }
};
</script>
