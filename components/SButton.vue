<template>
    <button class="s-button">
        <slot />
    </button>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.s-button {
    border-radius: 20px;
    border: 1px solid #000;
    cursor: pointer;
    width: 100%;
    padding: 0.5rem 1.5rem;

    @include typography.font(body, m);

    &:hover {
        background-color: var(--color-btn-bg-hover);
    }

    &:active {
        background-color: var(--color-btn-bg-active);
    }

    &:disabled {
        background-color: var(--color-btn-bg-disabled);
        color: #aaa;
        border-color: #ccc;
        cursor: not-allowed;

        &:hover {
            background-color: var(--color-btn-bg-disabled);
            color: #aaa;
        }
    }
}
</style>
