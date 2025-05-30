<template>
    <h1>Ingredients</h1>
    <SButton class="btn" @click="$router.push('/create/ingredient')">Add New Ingredient</SButton>

    <pre>
        {{ data }}
    </pre>
</template>

<script setup lang="ts">
const { data, error } = await useFetch('/api/ingredient');
console.log('Ingredients: ', data.value);
console.log('Error: ', error.value);
</script>

<style scoped lang="scss">
.btn {
    width: 25%;
}
</style>
