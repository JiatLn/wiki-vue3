import type { INoteData } from '@/api/wiki/noteApi';
import { getNoteListApi } from '@/api/wiki/noteApi';
import { OK_CODE } from '@/app/keys';
import type { Ref } from 'vue';
import { ref, watch } from 'vue';

const useNotes = (space: Ref<string>) => {
  const noteList = ref<INoteData[]>([]);
  const total = ref(0);
  const loading = ref(false);

  const refresh = async () => {
    loading.value = true;
    const { code, data } = await getNoteListApi({
      pageNum: 1,
      pageSize: 10,
      space: space.value,
    });
    loading.value = false;
    if (code === OK_CODE) {
      noteList.value = data.rows.filter((item) => item.isPublished === true);
      total.value = data.total;
    }
  };

  watch(
    () => space.value,
    () => {
      refresh();
    }
  );

  return {
    noteList,
    total,
    loading,
    refresh,
  };
};

export default useNotes;
