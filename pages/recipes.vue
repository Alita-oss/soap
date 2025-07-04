<template>
    <h1>Recipes</h1>
    <SButton @click="$router.push('/create/recipe')">Add New Recipe</SButton>

    <pre>
        {{ data }}
    </pre>
</template>

<script setup lang="ts">
const { data, error } = await useFetch('/api/recipe');
console.log('Recipes: ', data.value);
console.log('Error: ', error.value);
</script>
