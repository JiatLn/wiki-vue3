<template>
  <div class="space-detail">
    <div class="space-detail__left">
      <div class="left-top">
        <el-icon class="home-btn">
          <Notebook @click="router.push({ name: 'SpaceList' })" />
        </el-icon>
        <el-icon><ArrowRight class="text-gray-400" /></el-icon>
        <span class="text-gray-500">{{ spaceDetail?.name }}</span>
        <el-tooltip content="新建笔记" placement="left">
          <div class="new-btn" @click="onNew">
            <el-icon>
              <Plus></Plus>
            </el-icon>
          </div>
        </el-tooltip>
      </div>
      <el-tabs type="card">
        <el-tab-pane :label="`笔记`">
          <NoteList :sid="sid"></NoteList>
        </el-tab-pane>
        <el-tab-pane label="草稿箱 (0)"></el-tab-pane>
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
  import { Plus } from '@element-plus/icons-vue';

  const router = useRouter();
  const route = useRoute();

  const sid = ref('');

  const { spaceDetail } = useSpaceDetail(sid);

  onMounted(() => {
    sid.value = route.params.sid as string;
  });

  const onNew = () => {
    router.push({
      name: 'NoteNew',
      params: {
        sid: route.params.sid,
      },
    });
  };
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
        @apply flex items-center h-12 px-2 space-x-2 relative;
        .home-btn {
          @apply cursor-pointer  text-red-400;
          font-size: 20px;
        }
        .new-btn {
          @apply float-right absolute right-2 bg-red-400 rounded-2xl w-7 h-7 flex justify-center items-center text-white cursor-pointer shadow leading-7;
        }
      }
    }
    .space-detail__right {
      @apply flex-1;
    }
  }
</style>
