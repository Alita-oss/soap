<template>
    <h1>Batches</h1>
</template>

<script setup lang="ts">
const { data, error } = await useFetch('/api/batch');
console.log('Batches: ', data.value);
console.log('Error: ', error.value);
</script>
