<template>
    <div :class="['s-input', { 's-input--error': error }]">
        <label>
            <span class="s-input__label">
                <slot name="label" />
            </span>
            <div class="s-input__input">
                <input :type="inputType" />
                <img v-if="error" src="~/assets/icons/error.svg" alt="error" />
            </div>
        </label>
        <div class="s-input__message">
            <slot name="message" />
        </div>
    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        inputType?: string;
        error?: boolean;
    }>(),
    {
        inputType: 'text',
        error: false,
    },
);
</script>

<style lang="scss" scoped>
.s-input {
    --padding-input: calc(1.5rem + 1px);
    width: 100%;

    label {
        display: flex;
        flex-direction: column;

        @include typography.font(body, s);
    }

    &__label {
        padding: 0 var(--padding-input);
    }

    input {
        border: solid 1px #000;
        border-radius: 20px;
        padding: 0.5rem 1.5rem;
        width: 100%;

        @include typography.font(body, m);
    }

    &__input {
        position: relative;

        img {
            position: absolute;
            right: var(--padding-input);
            top: 50%;
            transform: translateY(-50%);
        }
    }

    &__message {
        padding: 0 var(--padding-input);

        @include typography.font(body, xs);
    }

    &--error {
        color: var(--color-warning);

        input {
            border-color: var(--color-warning);
        }

        img {
            color: var(--color-warning);
        }
    }
}
</style>
