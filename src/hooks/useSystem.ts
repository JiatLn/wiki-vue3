import useUserStore from '@/store/modules/useUserStore';
import { useRouter } from 'vue-router';

const useSystem = () => {
  const userStore = useUserStore();
  const router = useRouter();
  const logout = () => {
    userStore.logout();
    router.push({
      name: 'Login',
    });
  };
  const checkIsLogin = () => {
    if (!userStore.isLogin()) {
      router.push({ name: 'Login' });
    }
  };
  return {
    logout,
    checkIsLogin,
  };
};

export default useSystem;
