<template>
    <h1>Batch detail</h1>
</template>

<script setup lang="ts">
const route = useRoute();
const { data, error } = await useFetch(`/api/batch/${route.params.id}`);
console.log('Batch detail: ', data.value);
console.log('Error: ', error.value);
</script>
