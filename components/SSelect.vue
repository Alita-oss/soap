<template>
    <label>
        <span class="s-select__label">
            <slot name="label" />
        </span>
        <div class="s-select__wrapper">
            <select v-model="computedValue" name="select" class="s-select">
                <option v-for="option in options" :key="option.value" :value="option.value">
                    {{ option.text }}
                </option>
            </select>
        </div>
    </label>
</template>

<script setup lang="ts">
type InputType = string | number | null;

const props = defineProps<{
    modelValue: InputType;
    options: { value: string; text: string }[];
}>();

const emit = defineEmits<{
    (event: 'update:modelValue', value: InputType): void;
}>();

const computedValue = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value);
    },
});
</script>

<style scoped lang="scss">
label {
    position: relative;

    @include typography.font(body, s);
}

.s-select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: solid 1px #000;
    border-radius: 20px;
    padding: 0.5rem 1.5rem;
    width: 100%;
    height: 49.6px;
    position: relative;

    @include typography.font(body, m);

    &__wrapper {
        &::after {
            content: '⏷';
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translate(-50%);
            pointer-events: none;
        }
    }

    &__label {
        padding: 0px 25px;
    }
}
</style>
