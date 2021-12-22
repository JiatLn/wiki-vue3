import type { ISpaceData } from '@/api/wiki/spaceApi';
import { getSpaceListApi } from '@/api/wiki/spaceApi';
import { OK_CODE } from '@/app/keys';
import { ref } from 'vue';

const useSpaces = () => {
  const spaceList = ref<ISpaceData[]>([]);
  const total = ref(0);
  const loading = ref(false);

  const refresh = async () => {
    loading.value = true;
    const { code, data } = await getSpaceListApi({
      pageNum: 1,
      pageSize: 10,
    });
    loading.value = false;
    if (code === OK_CODE) {
      spaceList.value = data.rows;
      total.value = data.total;
    }
  };

  return {
    spaceList,
    total,
    loading,
    refresh,
  };
};

export default useSpaces;
