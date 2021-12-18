<template>
  <div class="login-page h-full w-full flex items-center">
    <div class="login-warpper">
      <p class="text-center my-6 font-bold">Wiki - 用户登录</p>
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
            登录
          </el-button>
        </el-form-item>
        <el-form-item class="w-full">
          <div class="bts flex justify-between">
            <div>
              还没有账号？
              <el-button type="text" @click="router.push({ name: 'Register' })">立即注册</el-button>
            </div>
            <el-button type="text">找回密码</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { LoginData } from '@/api/user/userApi';
  import { loginApi } from '@/api/user/userApi';
  import { OK_CODE } from '@/app/keys';
  import { reactive, ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import { User, Lock } from '@element-plus/icons-vue';
  import useUserStore from '@/store/modules/useUserStore';
  import router from '@/router';

  const form = reactive<LoginData>({
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
          let { code, data, msg } = await loginApi(form);
          if (code === OK_CODE) {
            console.log('登录成功');
            const userStore = useUserStore();
            userStore.login(data);
            ElMessage.success('登录成功');
            router.push({
              name: 'Front',
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
  .login-warpper {
    @apply w-96 border rounded shadow p-2 m-auto;
    .form {
      @apply flex flex-col items-center justify-center py-2 px-8;
    }
    .btns {
      font-size: 14px !important;
    }
  }
</style>
