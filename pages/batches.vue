<template>
    <div>
        <h1>All Batches</h1>
        <SButton @click="$router.push('/create/batch')">Add New Batch</SButton>

        <pre>
            {{ data }}
        </pre>
    </div>
</template>

<script setup lang="ts">
const { data, error } = await useFetch('/api/batch');
console.log('Batches: ', data.value);
console.log('Error: ', error.value);
</script>
