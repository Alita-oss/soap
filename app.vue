<template>
    <div class="layout">
        <!--<div>
            <SInput></SInput>
            <SSelect v-model="selectedUnit" :options="unitOptions">
                <template #label>Choose Unit</template>
            </SSelect>
            <p>{{ selectedUnit }}</p>
            <SInput></SInput>
            <SButton>Submit</SButton>
        </div>-->
    </div>
</template>

<script setup lang="ts">
/*import SSelect from './components/SSelect.vue';
import SInput from './components/SInput.vue';
import SButton from './components/SButton.vue';
import type { Unit } from '~/types/unit';

const unitOptions: { value: Unit; text: string }[] = [
    { value: 'g', text: 'grams' },
    { value: 'oz', text: 'ounces' },
    { value: 'ml', text: 'milliliters' },
    { value: 'tsp', text: 'teaspoons' },
    { value: 'tbsp', text: 'tablespoons' },
];
const selectedUnit = ref<Unit>('g');*/

onMounted(async () => {
    /*const res = await fetch('/api/recipe', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });*/
    /*const res = await fetch('/api/ingredient/dfx', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: 'hej'
        }),
    });

    console.log('Response:', await res.json());*/
});
</script>

<style scoped lang="scss">
.layout {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
