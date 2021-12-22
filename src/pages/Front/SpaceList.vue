<template>
  <div class="space-list">
    <ToolBar></ToolBar>
    <div class="main">
      <PageAside></PageAside>
      <PageContent></PageContent>
    </div>
  </div>
</template>

<script setup lang="ts">
  import PageAside from '@/components/SpaceList/PageAside.vue';
  import PageContent from '@/components/SpaceList/PageContent.vue';
  import ToolBar from '@/components/SpaceList/ToolBar.vue';
</script>

<style scoped lang="scss">
  .space-list {
    @apply flex flex-col;
    height: calc(100vh - 3.5rem);

    .main {
      @apply flex flex-1;
      background-color: #eee;
    }
  }
</style>
