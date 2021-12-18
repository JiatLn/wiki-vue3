import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export interface UserInfo {
  id: string;
  token: string;
  username: string;
}

export const USER_KEY = 'user';
const useUserStore = defineStore({
  id: USER_KEY,
  state: () => ({
    token: '',
    id: '',
    username: '',
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setId(id: string) {
      this.id = id;
    },
    login(user: Partial<UserInfo>) {
      this.$patch({
        ...user,
      });
    },
    logout() {
      this.$state = { token: '', id: '', username: '' };
      localStorage.removeItem(USER_KEY);
    },
    isLogin() {
      return this.token !== '';
    },
  },
});

const instance = useUserStore();
instance.$subscribe((mutation, state) => {
  localStorage.setItem(instance.$id, JSON.stringify(state));
});

const val = localStorage.getItem(instance.$id);
if (val) {
  instance.login(JSON.parse(val));
}

export default useUserStore;
