<template>
  <aside class="aside">
    <el-menu default-active="1" class="h-full">
      <el-menu-item index="1">
        <el-icon><Notebook /></el-icon>
        <span>知识库</span>
      </el-menu-item>
      <el-menu-item index="2" disabled>
        <el-icon><Share /></el-icon>
        <span>与我共享</span>
      </el-menu-item>
    </el-menu>
  </aside>
</template>

<script setup lang="ts">
  import { Notebook, Share } from '@element-plus/icons-vue';
</script>

<style scoped lang="scss">
  .aside {
    @apply sm:w-min lg:w-64;
  }
</style>
