<template>
  <HeaderVue></HeaderVue>
  <WikiListVue></WikiListVue>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import HeaderVue from './Front/Header.vue';
  import WikiListVue from './Front/WikiList.vue';

  const router = useRouter();
</script>

<style scoped></style>
