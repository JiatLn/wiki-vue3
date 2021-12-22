<template>
  <HeaderVue></HeaderVue>
  <router-view></router-view>
</template>

<script setup lang="ts">
  import HeaderVue from '@/components/Front/Header.vue';
  import useSystem from '@/hooks/useSystem';
  import { onMounted } from 'vue';

  const { checkIsLogin } = useSystem();

  onMounted(() => {
    checkIsLogin();
  });
</script>

<style scoped lang="scss"></style>
