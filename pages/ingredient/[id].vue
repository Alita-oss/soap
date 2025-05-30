<template>
    <h1>Ingredient detail</h1>

    <pre>{{ data }}</pre>

    <SButton v-if="!updateIngredient" @click="updateIngredient = true">Edit Ingredient</SButton>
    <SButton v-if="!deleteIngredient" @click="deleteIngredient = true">Delete Ingredient</SButton>

    <IngredientForm
        v-if="updateIngredient && ingredientForEdit"
        :modelValue="ingredientForEdit"
        @submit="handleUpdateSubmit"
    />

    <div v-if="deleteIngredient">
        <p>Are you sure you want to delete {{ ingredientForEdit.name }}?</p>

        <SButton @click="deleteIngredient = false">Cancel</SButton>
        <SButton @click="handleDelete">Delete</SButton>
    </div>
</template>

<script setup lang="ts">
import status from 'http-status';
import type { Form } from '~/components/IngredientForm.vue';
import type { Ingredient } from '~/types/ingredient';

const route = useRoute();
const router = useRouter();
const { id } = route.params;
const { data, error, refresh } = await useFetch(`/api/ingredient/${id}`);

if (error?.value) {
    throw createError({
        message: error.value?.message,
        statusCode: error.value?.statusCode,
        data: {
            rawError: error.value,
        },
        fatal: true,
    });
}

const updateIngredient = ref(false);
const deleteIngredient = ref(false);
const ingredientForEdit = ref<Ingredient>({ ...data.value?.ingredient });

const handleUpdateSubmit = async (data: Form) => {
    const body = {
        name: data.name,
        category: data.category,
        unit: data.unit,
    };

    const res = await $fetch(`/api/ingredient/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    });

    await refresh();
    console.log('res: ', res);
    updateIngredient.value = false;
};

const handleDelete = async () => {
    const res = await $fetch(`/api/ingredient/${id}`, {
        method: 'DELETE',
    });

    if (res?.statusCode === status.OK) {
        router.replace('/');
    }
};
</script>
