<template>
  <div class="header">
    <p class="text-xl">{{ noteDetail?.title }}</p>
    <div class="btns">
      <el-button type="danger" size="mini" :icon="Delete" @click="deleteNote">删除</el-button>
    </div>
  </div>
  <div class="content">
    <el-skeleton :loading="loading" class="p-4" :rows="6" animated :throttle="500">
      <v-md-editor v-model="content" mode="preview"></v-md-editor>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
  import useNoteDetail from '@/hooks/useNoteDetail';
  import { ref, onMounted, watch, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { Delete } from '@element-plus/icons-vue';

  const route = useRoute();

  const nid = ref('');
  const { noteDetail, loading, deleteNote } = useNoteDetail(nid);

  onMounted(() => {
    nid.value = route.params.nid as string;
  });

  watch(
    () => route.params.nid,
    (val) => {
      nid.value = val as string;
    }
  );

  // 只读的计算属性
  const content = computed({
    get() {
      return noteDetail.value?.content;
    },
    set() {},
  });
</script>

<style scoped lang="scss">
  .header {
    @apply flex justify-between items-center h-12 px-4 border-b border-gray-300;
  }
  .content {
    @apply bg-white w-full p-8;
    height: calc(100vh - 6.5rem);
  }
</style>
