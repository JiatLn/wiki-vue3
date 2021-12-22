<template>
  <div class="space-detail">
    <div class="space-detail__left">
      <div class="left-top">
        <el-icon class="home-btn">
          <Notebook @click="router.push({ name: 'SpaceList' })" />
        </el-icon>
        <el-icon><ArrowRight class="text-gray-400" /></el-icon>
        <span class="text-gray-500">{{ spaceDetail?.name }}</span>
      </div>
      <el-tabs type="card" @tab-click="handleClick">
        <el-tab-pane label="笔记">
          <NoteList :sid="sid"></NoteList>
        </el-tab-pane>
        <el-tab-pane label="草稿箱"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="space-detail__right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
  import useSpaceDetail from '@/hooks/useSpaceDetail';
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Notebook, ArrowRight } from '@element-plus/icons-vue';
  import NoteList from '@/components/Note/NoteList.vue';

  const router = useRouter();
  const route = useRoute();

  const sid = ref('');

  const { spaceDetail } = useSpaceDetail(sid);

  onMounted(() => {
    sid.value = route.params.sid as string;
  });

  const handleClick = () => {};
</script>

<style scoped lang="scss">
  .space-detail {
    @apply flex;
    height: calc(100vh - 3.5rem);
    .space-detail__left {
      @apply w-72;
      border-right: 1px solid #eee;
      :deep(.el-tabs__header.is-top) {
        margin-bottom: 0;
      }
      .left-top {
        @apply flex items-center h-12 px-2 space-x-2;
        .home-btn {
          @apply cursor-pointer  text-red-400;
          font-size: 20px;
        }
      }
    }
    .space-detail__right {
      @apply flex-1;
    }
  }
</style>
