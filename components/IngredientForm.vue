<template>
    <SForm :disabled="submitDisabled" @submit="handleSubmit">
        <SInput key="ingredient-name" v-model="form.name">
            <template #label>Ingredient name</template>
        </SInput>

        <SSelect key="ingredient-category" v-model="form.category" :options="categoryOptions">
            <template #label>Category</template>
        </SSelect>

        <SSelect key="ingredient-unit" v-model="form.unit" :options="unitOptions">
            <template #label>Units of weight</template>
        </SSelect>
    </SForm>
</template>

<script setup lang="ts">
import { Unit } from '~/types/unit';
import { Category } from '~/types/category';
import { useSelectOptions } from '~/composables/useSelectOptions';

const props = defineProps<{ modelValue?: Form }>();
const emit = defineEmits<{
    (event: 'submit', value: Form): void;
}>();

export type Form = {
    name: string;
    category: Category | null;
    unit: Unit | null;
};

const { generateSelectOptionsFromEnum } = useSelectOptions();

const form = ref<Form>({
    name: props.modelValue?.name ?? '',
    category: props.modelValue?.category ?? null,
    unit: props.modelValue?.unit ?? null,
});

const categoryOptions = generateSelectOptionsFromEnum<Category>(Category);
const unitOptions = generateSelectOptionsFromEnum<Unit>(Unit, false);

const submitDisabled = computed(() => Boolean(!form.value.name || !form.value.category || !form.value.unit));

const handleSubmit = () => {
    if (submitDisabled.value) return;

    emit('submit', form.value);
};
</script>
