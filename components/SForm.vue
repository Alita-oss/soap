<template>
    <form class="form" @submit.prevent>
        <slot />
        <SButton type="submit" @click="$emit('submit')">Submit</SButton>
    </form>
</template>

<script setup lang="ts"></script>

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
