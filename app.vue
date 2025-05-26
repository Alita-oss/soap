<template>
    <div class="layout"></div>
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
        body: {
            name: 'hej'
        }
    });

    const data = await res.json();
    console.log('Response:', data);*/
});
</script>

<style scoped lang="scss">
.layout {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
