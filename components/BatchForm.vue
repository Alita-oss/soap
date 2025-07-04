<template>
    <SForm :disabled="submitDisabled" @submit="handleSubmit">
        <SInput key="batch-createdDate" v-model="form.createdDate" input-type="date">
            <template #label>Created date</template>
        </SInput>

        <SSelect key="batch-recipe" v-model="form.recipe" :options="recipeOptions">
            <template #label>Recipe</template>
        </SSelect>

        <SInput key="batch-barCount" v-model="form.barCount" input-type="number">
            <template #label>Bar count</template>
        </SInput>

        <ul v-if="form.weightIns.length">
            <li v-for="(item, index) in form.weightIns" :key="index">{{ item.date }} - {{ item.weightIn }}g</li>
        </ul>

        <SButton v-if="!showWeightIn" @click="showWeightIn = true">Add Weight In</SButton>
        <AddBatchWeightIn v-if="showWeightIn" @add="handleAddWeightIn"></AddBatchWeightIn>
    </SForm>
</template>

<script setup lang="ts">
export type Form = {
    createdDate: Date;
    recipe: string;
    barCount: number;
    weightIns: {
        weightIn: number;
        date: Date;
    }[];
    name: string;
};

const props = defineProps<{ modelValue?: Form }>();
const emit = defineEmits<{
    (event: 'submit', value: Form): void;
    (event: 'addWeightIn', value: { weightIn: number; date: Date }): void;
}>();

const form = ref<Form>({
    createdDate: props.modelValue?.createdDate ?? new Date(),
    recipe: props.modelValue?.recipe ?? '',
    barCount: props.modelValue?.barCount ?? 0,
    weightIns: props.modelValue?.weightIns ?? [],
    name: props.modelValue?.name ?? '',
});

const showWeightIn = ref(false);

const transformRecipesDataToOptions = (data: any): { value: string; text: string }[] => {
    if (!data || !Array.isArray(data.recipes)) return [];

    return data.recipes.map((recipe: any) => ({
        value: recipe._id,
        text: recipe.name,
    }));
};

const recipeOptions = ref<{ value: string; text: string }[]>([]);
onMounted(async () => {
    const recipes = await $fetch('/api/recipe');
    recipeOptions.value = transformRecipesDataToOptions(recipes);
});

const handleAddWeightIn = (data: { weightIn: number; date: Date }) => {
    form.value.weightIns.push(data);
    showWeightIn.value = false;
};

const generatedName = computed(() => {
    const recipeText = recipeOptions.value.find((recipe) => recipe.value === form.value.recipe)?.text;
    const date = new Date(form.value.createdDate);
    return `${recipeText}-${date}`;
});

const submitDisabled = computed(() => Boolean(!form.value.createdDate || !form.value.recipe));

const handleSubmit = () => {
    if (submitDisabled.value) return;

    emit('submit', {
        ...form.value,
        name: generatedName.value,
    });
};
</script>
