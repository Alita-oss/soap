<template>
    <div class="layout">
        <NuxtPage />
    </div>
</template>

<script setup lang="ts">
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
