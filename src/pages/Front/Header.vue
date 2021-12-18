<template>
  <div class="header">
    <div class="header-left">Wiki</div>
    <div class="header-right">
      <template v-if="userStore.isLogin()">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <el-dropdown trigger="click">
          <span class="text-white">
            {{ userStore.username }}
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click="onLogout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import useUserStore from '@/store/modules/useUserStore';
  import { ArrowDown } from '@element-plus/icons-vue';
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  const userStore = useUserStore();
  const router = useRouter();

  onMounted(() => {
    if (!userStore.isLogin()) {
      router.push({ name: 'Login' });
    }
  });

  const onLogout = () => {
    userStore.logout();
    router.push({ name: 'Login' });
  };
</script>

<style scoped lang="scss">
  .header {
    @apply shadow w-full h-14 px-4 bg-red-400 flex justify-between items-center;
    .header-left {
      @apply text-white uppercase;
    }
    .header-right {
      @apply flex items-center space-x-3;
    }
  }
</style>
