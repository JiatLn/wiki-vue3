import type { Ref } from 'vue';
import { ref, watch } from 'vue';
import type { ISpaceData } from '@/api/wiki/spaceApi';
import { getSpaceByIdApi } from '@/api/wiki/spaceApi';
import { OK_CODE } from '@/app/keys';

const useSpaceDetail = (sid: Ref<string>) => {
  const spaceDetail = ref<ISpaceData>();
  const loading = ref(false);

  watch(
    () => sid.value,
    async () => {
      await refresh();
    }
  );

  const refresh = async () => {
    loading.value = true;
    const { code, data } = await getSpaceByIdApi(sid.value);
    loading.value = false;
    if (code === OK_CODE) {
      spaceDetail.value = data;
    }
  };

  return {
    spaceDetail,
    loading,
    refresh,
  };
};

export default useSpaceDetail;
