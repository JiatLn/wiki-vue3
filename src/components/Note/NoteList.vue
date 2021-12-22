<template>
  <ul class="note-list">
    <li
      v-for="(item, i) in noteList"
      :key="i"
      class="note-item"
      :class="{ active: item.nid === activeIndex }"
      @click="onClick(item.nid)"
    >
      {{ item.title }}
    </li>
  </ul>
</template>

<script setup lang="ts">
  import useNotes from '@/hooks/useNotes';
  import { toRef, computed, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import emmiter from '@/lib/eventBus';

  const props = defineProps<{
    sid: string;
  }>();

  const router = useRouter();
  const route = useRoute();

  const { noteList, refresh } = useNotes(toRef(props, 'sid'));

  emmiter.on('note:refresh', () => {
    refresh();
    router.push({
      name: 'NoteDetail',
      params: {
        sid: props.sid,
        nid: noteList.value[0].nid,
      },
    });
  });

  // 默认显示第一条内容
  watch(
    () => noteList.value.length,
    () => {
      if (!route.params.nid && noteList.value.length) {
        router.push({
          name: 'NoteDetail',
          params: {
            sid: props.sid,
            nid: noteList.value[0].nid,
          },
        });
      }
    }
  );

  const activeIndex = computed(() => {
    return route.params.nid || noteList.value[0].nid;
  });

  const onClick = (nid: string) => {
    router.push({
      name: 'NoteDetail',
      params: {
        sid: props.sid,
        nid: nid,
      },
    });
  };
</script>

<style scoped lang="scss">
  @import '../../assets/styles/mixin';
  .note-list {
    @apply flex flex-col;
    height: calc(100vh - 42px - 48px - 56px);
    @include scroll($hide: #ddd);
    .note-item {
      border-bottom: 1px solid #eee;
      @apply h-10 leading-10  flex items-center pl-4 cursor-pointer hover:text-white hover:bg-red-400;
      &.active {
        @apply text-white bg-red-400;
      }
    }
  }
</style>
