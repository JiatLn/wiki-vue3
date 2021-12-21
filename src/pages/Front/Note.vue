<template>
  <div class="header">
    <span></span>
    <el-button type="primary" @click="onNew">新建笔记</el-button>
  </div>
  <el-skeleton :loading="loading" class="p-4" :rows="6" animated :throttle="500">
    <v-md-editor v-model="content" mode="preview" class="md-editor"></v-md-editor>
  </el-skeleton>
</template>

<script setup lang="ts">
  import useNoteDetail from '@/hooks/useNoteDetail';
  import { ref, onMounted, computed, watch } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const onNew = () => {
    router.push({
      name: 'NoteNew',
      params: {
        sid: router.currentRoute.value.params.sid,
      },
    });
  };

  const nid = ref('');

  onMounted(() => {
    nid.value = router.currentRoute.value.params.nid as string;
  });

  watch(
    () => router.currentRoute.value.params.nid,
    (val) => {
      nid.value = val as string;
    }
  );

  const { noteDetail, loading, refresh } = useNoteDetail(nid);

  const content = computed(() => {
    return noteDetail.value?.content;
  });
</script>

<style scoped lang="scss">
  .header {
    @apply flex justify-between items-center h-12 px-4;
  }
  .md-editor {
    @apply w-full;
    height: calc(100vh - 5rem);
  }
</style>
