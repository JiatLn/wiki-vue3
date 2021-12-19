<template>
  <div class="wiki-list">
    <ToolBar></ToolBar>
    <div class="main">
      <PageAside></PageAside>
      <Content></Content>
    </div>
  </div>
</template>

<script setup lang="ts">
  import PageAside from './WikiList/PageAside.vue';
  import Content from './WikiList/Content.vue';
  import ToolBar from './WikiList/ToolBar.vue';
</script>

<style scoped lang="scss">
  .wiki-list {
    @apply flex flex-col;
    height: calc(100vh - 3.5rem);

    .main {
      @apply flex flex-1;
      background-color: #eee;
    }
  }
</style>
