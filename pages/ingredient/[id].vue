<template>
    <h1>Ingredient detail</h1>
</template>

<script setup lang="ts">
const route = useRoute();
const { data, error } = await useFetch(`/api/ingredient/${route.params.id}`);
console.log('Ingredient detail: ', data.value);
console.log('Error: ', error.value);
</script>
