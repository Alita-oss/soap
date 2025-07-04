<template>
    <h1>Batch detail</h1>

    <pre> {{ data }}</pre>

    <SButton v-if="!updateBatch" @click="updateBatch = true">Edit Batch</SButton>
    <SButton v-if="!deleteBatch" @click="deleteBatch = true">Delete Batch</SButton>

    <BatchForm v-if="updateBatch && batchForEdit" :modelValue="batchForEdit" @submit="handleUpdateSubmit" />

    <div v-if="deleteBatch">
        <p>Are you sure you want to delete {{ batchForEdit.name }}?</p>

        <SButton @click="deleteBatch = false">Cancel</SButton>
        <SButton @click="handleDelete">Delete</SButton>
    </div>
</template>

<script setup lang="ts">
import status from 'http-status';
import type { Form } from '~/components/BatchForm.vue';
import type { Batch } from '~/types/batch';

const route = useRoute();
const router = useRouter();
const { id } = route.params;
const { data, error, refresh } = await useFetch(`/api/batch/${id}`);

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

const updateBatch = ref(false);
const deleteBatch = ref(false);
const batchForEdit = ref<Batch>({ ...data.value?.batch });

const handleUpdateSubmit = async (data: Form) => {
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

    const res = await $fetch(`/api/batch/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    });
    await refresh();
    console.log('res: ', res);
    updateBatch.value = false;
};

const handleDelete = async () => {
    const res = await $fetch(`/api/batch/${id}`, {
        method: 'DELETE',
    });

    if (res?.statusCode === status.OK) {
        router.replace('/');
    }
};
</script>
