<template>
    <label>
        <span>
            <slot name="label" />
        </span>
        <div class="s-select__wrapper">
            <select
                name="select"
                class="s-select"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
            >
                <option v-for="option in options" :key="option.value" :value="option.value">
                    {{ option.text }}
                </option>
            </select>
        </div>
    </label>
</template>

<script setup lang="ts">
defineProps<{
    modelValue: string;
    options: { value: string; text: string }[];
}>();

defineEmits(['update:modelValue']);
</script>

<style scoped lang="scss">
label {
    position: relative;
}

.s-select {
    appearance: none; /* Remove default styling */
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
}
</style>
