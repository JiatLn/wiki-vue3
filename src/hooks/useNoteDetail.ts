import type { INoteData } from '@/api/wiki/noteApi';
import { delNoteByIdApi } from '@/api/wiki/noteApi';
import { getNoteByIdApi } from '@/api/wiki/noteApi';
import type { Ref } from 'vue';
import { ref, watch } from 'vue';
import { OK_CODE } from '@/app/keys';
import { ElMessage, ElMessageBox } from 'element-plus';
import emitter from '@/lib/eventBus';

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

  const deleteNote = () => {
    ElMessageBox.confirm('您确定要删除该笔记吗？', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        const { code, msg } = await delNoteByIdApi(nid.value);
        if (code === OK_CODE) {
          ElMessage.success(msg);
          emitter.emit('note:refresh');
        } else {
          ElMessage.error(msg);
        }
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消删除。',
        });
      });
  };

  return {
    deleteNote,
    noteDetail,
    loading,
    refresh,
  };
};

export default useNoteDetail;
