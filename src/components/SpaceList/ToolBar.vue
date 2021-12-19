<template>
  <div class="tool-bar">
    <span>知识库</span>
    <AddSpace></AddSpace>
  </div>
</template>

<script setup lang="ts">
  import AddSpace from './AddSpace.vue';
</script>

<style scoped lang="scss">
  .tool-bar {
    @apply flex flex-row justify-between items-center h-12 border-b py-2 px-4;
  }
</style>
