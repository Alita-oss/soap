<template>
    <SForm @submit="handleSubmit">
        <template v-if="item === 'batch'">
            <SInput v-model="form.createdDate">
                <template #label>Created date</template>
            </SInput>

            <SInput v-model="form.recipe">
                <template #label>Link to a recipe</template>
            </SInput>

            <SInput v-model="form.barCount">
                <template #label>Bar count</template>
            </SInput>
        </template>
        <template v-if="item === 'ingredient'">
            <SInput v-model="form.name">
                <template #label>Ingredient name</template>
            </SInput>

            <SInput v-model="form.unit">
                <template #label>Units of weight</template>
            </SInput>

            <SInput v-model="form.category">
                <template #label>Category</template>
            </SInput>
        </template>
        <template v-if="item === 'recipe'">
            <SInput v-model="form.name">
                <template #label>Recipe name</template>
            </SInput>

            <SInput v-model="form.ingredent">
                <template #label>List of ingredients</template>
            </SInput>

            <SInput v-model="form.amount">
                <template #label>Ingredient amount</template>
            </SInput>
        </template>
    </SForm>
</template>

<script setup lang="ts">
const route = useRoute();
const { item } = route.params;

const ingredientFormFactory = () => ({
    name: '',
    unit: '',
    category: '',
});

const recipeFormFactory = () => ({
    name: '',
    ingredents: [],
    amount: 0,
});

const batchFormFactory = () => ({
    createdDate: new Date(),
    recipe: null,
    barCount: 0,
});

const form = ref(
    item === 'batch'
        ? batchFormFactory()
        : item === 'recipe'
        ? recipeFormFactory()
        : item === 'ingredient'
        ? ingredientFormFactory()
        : null,
);

const handleSubmit = () => {
    console.log('form: ', form.value);
};
</script>
