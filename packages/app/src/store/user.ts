import { ref } from 'vue';
import { createInjectionState } from '@slan-health/taro-vueuse';

interface User {
  name: string;
  age: number;
}

const [useProvidingUserState, useInjectedUserState, installUserStore] = createInjectionState(() => {
  const user = ref({
    name: 'wkw',
    age: 30,
  });

  function updataUser(u: User) {
    user.value = u;
  }

  return { user, updataUser };
});

export { useProvidingUserState, useInjectedUserState, installUserStore }
