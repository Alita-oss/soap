<template>
    <SInput v-model="selectedWeightIn" input-type="number">
        <template #label>Weight of soap</template>
    </SInput>
    <SInput v-model="weightInDate" input-type="date">
        <template #label>Date of weight in</template>
    </SInput>
    <SButton class="btn" @click="addWeightIn">Add</SButton>
</template>

<script setup lang="ts">
const selectedWeightIn = ref(0);
const weightInDate = ref(new Date());

const emit = defineEmits<{
    (event: 'add', value: { weightIn: number; date: Date }): void;
}>();

const addWeightIn = () => {
    const date = new Date(weightInDate.value);
    if (selectedWeightIn.value && !isNaN(date.getTime())) {
        emit('add', {
            weightIn: selectedWeightIn.value,
            date,
        });
    }
};
</script>

<style scoped lang="scss">
.btn {
    width: 25%;
}
</style>
