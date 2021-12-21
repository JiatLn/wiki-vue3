<template>
  <ul class="note-list">
    <li
      class="note-item"
      :class="{ active: item.nid === activeIndex }"
      v-for="(item, i) in noteList"
      :key="i"
      @click="onClick(item.nid)"
    >
      {{ item.title }}
    </li>
  </ul>
</template>

<script setup lang="ts">
  import useNotes from '@/hooks/useNotes';
  import { ref, watch, toRef } from 'vue';
  import { useRouter } from 'vue-router';

  const props = defineProps<{
    sid: string;
  }>();

  const activeIndex = ref('');

  const router = useRouter();

  const { noteList } = useNotes(toRef(props, 'sid'));

  watch(
    () => noteList.value,
    (val) => {
      if (val.length) {
        activeIndex.value = val[0].nid;
        router.push({
          name: 'Note',
          params: {
            sid: props.sid,
            nid: val[0].nid,
          },
        });
      }
    }
  );

  const onClick = (nid: string) => {
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
