<template>
    <button :disabled="disabled" :class="['s-button', { 's-button--disabled': disabled }]">
        <slot />
    </button>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        disabled?: boolean;
    }>(),
    {
        disabled: false,
    },
);
</script>

<style scoped lang="scss">
.s-button {
    padding: 0.5rem 1.5rem;
    border-radius: 20px;
    border: 1px solid #000;
    background-color: #fff;
    color: #000;
    cursor: pointer;
    width: 15%;

    @include typography.font(body, s);

    &:hover {
        background-color: #000;
        color: #fff;
    }

    &--disabled {
        background-color: #f0f0f0;
        color: #aaa;
        border-color: #ccc;
        cursor: not-allowed;

        &:hover {
            background-color: #f0f0f0;
            color: #aaa;
        }
    }
}
</style>
