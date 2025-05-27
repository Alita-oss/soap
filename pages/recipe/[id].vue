<template>
    <h1>Recipe detail</h1>
</template>

<script setup lang="ts">
const route = useRoute();
const { data, error } = await useFetch(`/api/recipe/${route.params.id}`);
console.log('Recipe detail: ', data.value);
console.log('Error: ', error.value);
</script>
