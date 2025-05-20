<template>
  <div>
    Hi 
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
