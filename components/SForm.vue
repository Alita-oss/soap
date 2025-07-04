<template>
    <form class="form" @submit.prevent>
        <slot />
        <SButton :disabled="disabled" @click="$emit('cta')">Submit</SButton>
    </form>
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

defineEmits<{
    (event: 'cta'): void;
}>();
</script>

<style scoped lang="scss">
.form {
    max-width: 400px;
    margin: 2rem auto;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fafafa;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}
</style>
