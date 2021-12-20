<template>
  <ul class="note-list">
    <li
      class="note-item"
      :class="{ active: i === activeIndex }"
      v-for="i in 6"
      :key="i"
      @click="onClick(i)"
    >
      这里是标题
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const props = defineProps<{
    sid: string;
  }>();

  const activeIndex = ref(1);

  const router = useRouter();

  const onClick = (nid: number) => {
    activeIndex.value = nid;
    router.push({
      name: 'Note',
      params: {
        sid: props.sid,
        nid: nid,
      },
    });
  };
</script>

<style scoped lang="scss">
  .note-list {
    @apply flex flex-col;
    .note-item {
      border-bottom: 1px solid #eee;
      @apply h-10 flex items-center pl-4 cursor-pointer hover:text-white hover:bg-red-400;
      &.active {
        @apply text-white bg-red-400;
      }
    }
  }
</style>
