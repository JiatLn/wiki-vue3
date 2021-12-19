<template>
  <el-button type="primary" @click="dialogVisible = true">新建知识库</el-button>
  <el-dialog v-model="dialogVisible" title="新建知识库" width="800px">
    <div class="dialog-body">
      <el-form
        ref="formEl"
        :rules="rules"
        :model="form"
        label-width="80px"
        label-position="top"
        class="w-96"
      >
        <el-form-item label="知识库名称" prop="name">
          <el-input v-model="form.name" placeholder="在这里输入知识库名称"></el-input>
        </el-form-item>
        <el-form-item label="知识库代号" prop="code">
          <el-input v-model="form.code" placeholder="在这里输入知识库代号"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="form.description"
            placeholder="在这里输入知识库描述"
            type="textarea"
            :autosize="{
              minRows: 4,
            }"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="tips">
        <el-alert title="知识库" type="info" :closable="false">
          知识库是记录信息和知识的页面集合，通过组织页面层级将知识系统化、结构化，在知识管理层面助力企业更快更好的发布产品。
        </el-alert>
      </div>
    </div>
    <template #footer>
      <div class="btns space-x-4">
        <el-button type="text" size="mini" @click="onCancel">取消</el-button>
        <el-button type="primary" size="mini" @click="onSubmit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { addSpaceApi } from '@/api/wiki/spaceApi';
  import { OK_CODE } from '@/app/keys';
  import emitter from '@/lib/eventBus';
  import Pinyin from '@/lib/Pinyin';
  import { ElMessage } from 'element-plus';
  import { reactive, ref, watch } from 'vue';

  const dialogVisible = ref(false);

  const form = reactive({
    name: '',
    code: '',
    description: '',
  });

  const formEl = ref<HTMLFormElement>(null!);

  const rules = {
    name: [{ required: true, message: '知识库名称不能为空', trigger: 'blur' }],
    code: [{ required: true, message: '知识库代号不能为空', trigger: 'blur' }],
  };

  const onCancel = () => {
    formEl.value.resetFields();
    dialogVisible.value = false;
  };

  const onSubmit = () => {
    formEl.value
      .validate()
      .then(async (ok: Boolean) => {
        if (!ok) return;
        let { code, msg } = await addSpaceApi(form);
        console.log(code, msg);
        if (code === OK_CODE) {
          ElMessage.success(msg);
          emitter.emit('space:refresh');
          onCancel();
        } else {
          ElMessage.error(msg);
        }
      })
      .catch();
  };

  watch(
    () => form.name,
    (val) => {
      form.code = Pinyin.getWordsCode(val).toUpperCase();
    }
  );
</script>

<style scoped lang="scss">
  .dialog-body {
    @apply flex space-x-8;
    .tips {
      @apply flex-1;
    }
  }
</style>
