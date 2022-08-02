import { computed, onUnmounted, watchEffect } from 'vue';
import { definePlugin } from '../definePlugin';
import { refToRaw } from '../utils';
import limitTrigger from '../utils/limitTrigger';
import subscriber from '../utils/listener';
import usePageFocus from './taro/usePageFocus';

export default definePlugin(
  (queryInstance, { refreshOnWindowFocus = false, refocusTimespan = 5000 }) => {
    const refreshOnWindowFocusRef = computed(() =>
      refToRaw(refreshOnWindowFocus),
    );
    const refocusTimespanRef = computed(() => refToRaw(refocusTimespan));
    const unsubscribeList: (() => void)[] = [];
    const addUnsubscribeList = (event?: () => void) => {
      event && unsubscribeList.push(event);
    };
    const unsubscribe = () => {
      unsubscribeList.forEach(fn => fn());
    };

    const subscribe = usePageFocus();



    watchEffect(() => {
      unsubscribe();

      if (refreshOnWindowFocusRef.value) {
        const limitRefresh = limitTrigger(
          queryInstance.context.refresh,
          refocusTimespanRef.value,
        );
        addUnsubscribeList(subscribe(limitRefresh));
      }
    });

    onUnmounted(() => {
      unsubscribe();
    });

    return {};
  },
);
