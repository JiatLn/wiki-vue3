<template>
  <section class="content">
    <el-skeleton :loading="loading" class="p-4" :rows="6" animated :throttle="500">
      <el-table :data="spaceList" style="width: 100%">
        <el-table-column prop="name" label="知识库" minWidth="200px"></el-table-column>
        <el-table-column
          prop="pageCount"
          label="文章数"
          width="200px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="updateAt"
          label="更新时间"
          width="200px"
          align="center"
        ></el-table-column>
      </el-table>
    </el-skeleton>
  </section>
</template>

<script setup lang="ts">
  import useSpaces from '@/hooks/useSpace';
  import emitter from '@/lib/eventBus';
  import { onMounted } from 'vue';

  emitter.on('space:refresh', () => refresh());

  const { loading, spaceList, refresh } = useSpaces();

  onMounted(() => {
    refresh();
  });
</script>

<style scoped lang="scss">
  .content {
    @apply flex-1;
    background-color: #fff;
  }
</style>
