<template>
    <div class="layout">
        <p class="hello">Hello</p>
        <h2 class="random">hesixdfgdj</h2>
        <!-- <div class="test">
            <SInput :error="error">
                <template #label>
                    <span>Label</span>
                </template>
                <template #message>
                    <span>Message asldkfj jkdsflk jdklfj dkslj</span>
                </template>
            </SInput>
        </div> -->
    </div>
</template>

<script setup lang="ts">
onMounted(async () => {
    const res = await fetch('/api/recipe', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await res.json();
    console.log('Response:', data);
});
</script>

<style scoped lang="scss">
.layout {
    max-width: 1200px;
    margin: 0 auto;
}

.hello {
    @include typography.font(body, xl);
}

.random {
    color: lightblue;

    @include functions.device(tablet) {
        color: pink;
    }
}
</style>
