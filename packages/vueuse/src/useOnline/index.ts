
import { computed } from 'vue';
import type { ComputedRef } from "vue";
import useNetworkType, { NetworkType } from '../useNetworkType';

function useOnline(): ComputedRef<boolean> {
  const networkType = useNetworkType();
  return computed(() => {
    const online = (networkType.value && networkType.value !== NetworkType.none) as boolean;
    return online;
  })
};

export default useOnline;