<template>
    <h1>Ingredients</h1>
</template>

<script setup lang="ts">
const { data, error } = await useFetch('/api/ingredient');
console.log('Ingredients: ', data.value);
console.log('Error: ', error.value);
</script>
