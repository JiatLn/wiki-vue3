<template>
  <section class="page-content">
    <el-skeleton :loading="loading" class="p-4" :rows="6" animated :throttle="500">
      <el-table :data="spaceList" class="w-full">
        <el-table-column prop="name" label="知识库" minWidth="200px">
          <template #default="{ row }">
            <el-link @click="onClick(row.sid)">{{ row.name }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="noteCount"
          label="笔记数"
          width="200px"
          align="center"
        ></el-table-column>
        <el-table-column prop="updateAt" label="更新日期" width="200px" align="center">
          <template #default="{ row }">
            {{ formatDate(row.updateAt, 'YYYY年MM月DD日') }}
          </template>
        </el-table-column>
      </el-table>
    </el-skeleton>
  </section>
</template>

<script setup lang="ts">
  import useSpaces from '@/hooks/useSpaces';
  import emitter from '@/lib/eventBus';
  import { formatDate } from '@/utils/date';
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  emitter.on('space:refresh', () => refresh());

  const { loading, spaceList, refresh } = useSpaces();

  onMounted(() => {
    refresh();
  });

  const router = useRouter();
  const onClick = (sid: string) => {
    router.push({
      name: 'SpaceDetail',
      params: {
        sid: sid,
      },
    });
  };
</script>

<style scoped lang="scss">
  .page-content {
    @apply flex-1 overflow-x-auto;
    background-color: #fff;
  }
</style>
