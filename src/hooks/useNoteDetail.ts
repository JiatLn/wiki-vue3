import type { INoteData } from '@/api/wiki/noteApi';
import { getNoteByIdApi } from '@/api/wiki/noteApi';
import type { Ref } from 'vue';
import { ref, watch } from 'vue';
import { OK_CODE } from '@/app/keys';

const useNoteDetail = (nid: Ref<string>) => {
  const noteDetail = ref<INoteData>();
  const loading = ref(false);

  watch(
    () => nid.value,
    async () => {
      await refresh();
    }
  );

  const refresh = async () => {
    loading.value = true;
    const { code, data } = await getNoteByIdApi(nid.value);
    loading.value = false;
    if (code === OK_CODE) {
      noteDetail.value = data;
    }
  };

  return {
    noteDetail,
    loading,
    refresh,
  };
};

export default useNoteDetail;
