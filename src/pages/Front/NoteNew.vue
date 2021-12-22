<template>
  <div class="editor-header">
    <div class="header__left flex-1 max-w-3xl">
      <el-input
        v-model="form.title"
        class="title-input"
        size="medium"
        placeholder=" 👈 在这里输入标题~"
      ></el-input>
    </div>
    <div class="header__right inline-flex ml-6">
      <div class="btns">
        <el-button type="success" size="mini">保存</el-button>
        <el-button type="primary" size="mini" @click="onPublish">发布</el-button>
        <el-button type="text" :icon="Close" @click="onClose"></el-button>
      </div>
    </div>
  </div>
  <div class="content">
    <v-md-editor v-model="form.content" mode="editable" @save="onSave"></v-md-editor>
  </div>
</template>

<script setup lang="ts">
  import type { INoteData } from '@/api/wiki/noteApi';
  import { addNoteApi } from '@/api/wiki/noteApi';
  import { OK_CODE } from '@/app/keys';
  import { ElMessage } from 'element-plus';
  import { nextTick, reactive } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Close } from '@element-plus/icons-vue';

  const router = useRouter();
  const route = useRoute();

  const form = reactive<Partial<INoteData>>({
    content: '',
    title: '',
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
    if (form.title === '' || form.content === '') {
      ElMessage.info('请先输入标题和内容');
      return;
    }
    form.isPublished = true;
    try {
      let { code, msg, data } = await addNoteApi(form);
      if (code === OK_CODE) {
        ElMessage.success(msg);
        nextTick(() => {
          router.push({
            name: 'NoteDetail',
            params: {
              sid: route.params.sid as string,
              nid: data.nid as string,
            },
          });
        });
      } else {
        ElMessage.error(msg);
      }
    } catch (error) {}
  };
</script>

<style scoped lang="scss">
  .editor-header {
    @apply flex justify-between items-center w-full h-12 px-4;
    .title-input :deep(input) {
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      border: none;
      &::placeholder {
        @apply text-gray-400;
        font-size: 16px;
      }
    }
  }
  .content {
    .v-md-editor {
      height: calc(100vh - 3rem);
    }
  }
</style>
