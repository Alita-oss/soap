<template>
    <BatchForm @submit="handleSubmit" />
</template>

<script setup lang="ts">
import type { Form } from '~/components/BatchForm.vue';

const handleSubmit = async (data: Form) => {
    const body = {
        name: data.name,
        createdDate: data.createdDate,
        recipe: data.recipe,
        barCount: data.barCount,
        weightIns: data.weightIns.map((item) => ({
            weight: Number(item.weightIn),
            date: new Date(item.date),
        })),
    };

    const res = await $fetch('/api/batch', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    });

    console.log('res: ', res);
};
</script>
