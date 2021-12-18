<template>
  <div class="register-page h-full w-full flex items-center">
    <div class="register-warpper">
      <p class="text-center my-6 font-bold">用户注册</p>
      <el-form ref="formEl" class="form" :rules="rules" :model="userInfo" @submit="handleSubmit">
        <el-form-item prop="username" class="w-full">
          <el-input v-model:model-value="userInfo.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="w-full">
          <el-input
            v-model:model-value="userInfo.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="w-full mt-2">
          <el-button class="w-full" type="primary" size="small" native-type="submit">
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { RegisterData } from '@/api/user/userApi';
  import { registerApi } from '@/api/user/userApi';
  import { OK_CODE } from '@/app/keys';
  import { reactive, ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import router from '@/router';

  const userInfo = reactive<RegisterData>({
    username: '',
    password: '',
  });

  const rules = {
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  };

  const formEl = ref<HTMLFormElement | null>(null);

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    formEl
      .value!.validate()
      .then(async (ok: Boolean) => {
        if (!ok) return;
        try {
          let { code, msg } = await registerApi(userInfo);
          if (code === OK_CODE) {
            ElMessage.success('注册成功');
            router.push({
              name: 'Login',
            });
          } else {
            ElMessage.error(msg);
          }
        } catch (error) {
          console.log(error);
        }
      })
      .catch(() => {});
  };
</script>

<style lang="scss" scoped>
  .register-warpper {
    @apply w-96 border rounded shadow p-2 m-auto;
    .form {
      @apply flex flex-col items-center justify-center py-2 px-8;
    }
  }
</style>
