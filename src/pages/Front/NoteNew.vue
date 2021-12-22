<template>
  <div class="editor-header">
    <div class="header__left">
      {{ form.title }}
    </div>
    <div class="header__right inline-flex">
      <el-button type="success" size="mini">保存</el-button>
      <el-button type="primary" @click="onPublish" size="mini">发布</el-button>
      <el-button type="text" @click="onClose" :icon="Close"></el-button>
    </div>
  </div>
  <div class="content">
    <v-md-editor v-model="form.content" mode="editable" @save="onSave"></v-md-editor>
  </div>
</template>

<script setup lang="ts">
  import { addNoteApi, INoteData } from '@/api/wiki/noteApi';
  import { OK_CODE } from '@/app/keys';
  import { ElMessage } from 'element-plus';
  import { reactive } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Close } from '@element-plus/icons-vue';

  const router = useRouter();
  const route = useRoute();

  const form = reactive<Partial<INoteData>>({
    content: '',
    title: '无标题',
    space: route.params.sid as string,
    isPublished: false,
  });

  const onSave = (text: string) => {
    console.log(text);
  };

  const onClose = () => {
    router.push({
      name: 'SpaceDetail',
    });
  };

  const onPublish = async () => {
    if (form.content === '') {
      ElMessage.info('请先输入笔记内容');
      return;
    }
    form.isPublished = true;
    try {
      let { code, msg } = await addNoteApi(form);
      if (code === OK_CODE) {
        ElMessage.success(msg);
      } else {
        ElMessage.error(msg);
      }
    } catch (error) {}
  };
</script>

<style scoped lang="scss">
  .editor-header {
    @apply flex justify-between items-center w-full h-12 px-4;
  }
  .content {
    .v-md-editor {
      height: calc(100vh - 3rem);
    }
  }
</style>
