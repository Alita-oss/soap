<template>
    <h1>Recipes</h1>
</template>

<script setup lang="ts">
const { data, error } = await useFetch('/api/recipe');
console.log('Recipes: ', data.value);
console.log('Error: ', error.value);
</script>
