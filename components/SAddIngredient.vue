<template>
    <SSelect v-model="selectedIngredientId" :options="ingredientOptions">
        <template #label> Ingredient name</template>
    </SSelect>
    <SInput v-model="amount" input-type="number">
        <template #label>Amount of ingredient</template>
    </SInput>
    <SButton class="btn" @click="addIngredient">Add</SButton>
</template>

<script setup lang="ts">
defineProps<{
    ingredientOptions: { value: string; text: string; unit: string }[];
}>();
const emit = defineEmits<{
    (event: 'add', ingredient: { _id: string; amount: number }): void;
}>();

const selectedIngredientId = ref('');
const amount = ref(0);
const addIngredient = () => {
    if (selectedIngredientId.value && amount.value > 0) {
        emit('add', {
            _id: selectedIngredientId.value,
            amount: amount.value,
        });
    }
};
</script>

<style scoped lang="scss">
.btn {
    width: 25%;
}
</style>
