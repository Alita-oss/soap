<template>
    <form class="form" @submit.prevent="ingredientForm">
        <div class="form__groups">
            <SInput v-model="form.name">
                <template #label>Ingredient name</template>
            </SInput>
        </div>

        <div class="form__groups">
            <SInput v-model="form.unit">
                <template #label>Units of weight</template>
            </SInput>
        </div>

        <div class="form__groups">
            <SInput v-model="form.category">
                <template #label>Category</template>
            </SInput>
        </div>

        <div class="form__button">
            <SButton>Submit</SButton>
        </div>
    </form>
</template>

<script setup lang="ts">
const form = ref({
    name: '',
    unit: '',
    category: '',
});

const ingredientForm = async () => {
    console.log('Sending data: ', form.value);
    const res = await $fetch('/api/ingredient', {
        method: 'POST',
        body: form.value,
    });
    console.log('Response: ', res);
};
</script>

<style scoped lang="scss">
.form {
    max-width: 400px;
    margin: 2rem auto;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fafafa;

    &__groups {
        margin-bottom: 1rem;
    }

    &__button {
        margin-top: 2.5rem;
    }
}
</style>
