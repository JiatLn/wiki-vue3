<template>
  <div class="register-page h-full w-full flex items-center">
    <div class="register-warpper">
      <p class="text-center my-6 font-bold">Wiki - 用户注册</p>
      <el-form ref="formEl" class="form" :rules="rules" :model="form" @submit="handleSubmit">
        <el-form-item prop="username" class="w-full">
          <el-input
            v-model:model-value="form.username"
            placeholder="用户名"
            :prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="w-full mt-2">
          <el-input
            v-model:model-value="form.password"
            type="password"
            placeholder="密码"
            :prefix-icon="Lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="w-full mt-2">
          <el-button class="w-full" type="primary" size="small" native-type="submit">
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="w-full">
          <div class="bts flex justify-between">
            <div>
              已有账号？
              <el-button type="text" @click="router.push({ name: 'Login' })">立即登录</el-button>
            </div>

            <el-button type="text">找回密码</el-button>
          </div>
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
  import { User, Lock } from '@element-plus/icons-vue';

  const form = reactive<RegisterData>({
    username: '',
    password: '',
  });

  const rules = {
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  };

  const formEl = ref<HTMLFormElement>(null!);

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    formEl
      .value!.validate()
      .then(async (ok: Boolean) => {
        if (!ok) return;
        try {
          let { code, msg } = await registerApi(form);
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
