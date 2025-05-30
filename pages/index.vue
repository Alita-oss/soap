<template>
    <h2>Lists</h2>
    <div class="all-lists">
        <SButton @click="$router.push('/ingredients')">View all ingredients</SButton>
        <SButton @click="$router.push('/recipes')">View all recipes</SButton>
        <SButton @click="$router.push('/batches')">View all batches</SButton>
    </div>

    <h2>Adding</h2>
    <div class="all-lists">
        <SButton @click="$router.push('/create/ingredient')">Add New Ingredient</SButton>
        <SButton @click="$router.push('/create/recipe')">Add New Recipe</SButton>
        <SButton @click="$router.push('/create/batch')">Add New Batch</SButton>
    </div>
</template>

<style scoped lang="scss">
h2 {
    padding: 20px 0px 5px 0px;
}
.all-lists {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 25%;
}
</style>
