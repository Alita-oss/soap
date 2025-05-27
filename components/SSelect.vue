<template>
    <label>
        <span>
            <slot name="label" />
        </span>
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
.s-select {
    border: solid 1px #000;
    border-radius: 20px;
    padding: 0.5rem 1.5rem;
    width: 100%;
    height: 49.6px;

    @include typography.font(body, m);
}
</style>
