<template>
    <IngredientForm @submit="handleSubmit" />
</template>

<script setup lang="ts">
import type { Form } from '~/components/IngredientForm.vue';

const handleSubmit = async (data: Form) => {
    const res = await $fetch('/api/ingredient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data,
    });

    console.log('res: ', res);
};
</script>
