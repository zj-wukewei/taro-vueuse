import { computed, onUnmounted, ref, watch } from 'vue';

import { definePlugin } from '../definePlugin';
import { isDocumentVisibility, isNil, isOnline, refToRaw } from '../utils';
import subscriber from '../utils/listener';
import type { Timeout } from '../utils/types';
import usePageReVisible from './taro/usePageReVisible';

export default definePlugin(
  (
    queryInstance,
    {
      pollingInterval,
      pollingWhenHidden = false,
      errorRetryCount = 0,
    },
  ) => {
    const pollingTimer = ref();
    const { subscribe, visible } = usePageReVisible();
    const pollingIntervalRef = computed(() => refToRaw(pollingInterval));
    const errorRetryCountRef = computed(() => refToRaw(errorRetryCount));

    const unsubscribeList: (() => void)[] = [];
    
    const addUnsubscribeList = (event?: () => void) => {
      event && unsubscribeList.push(event);
    };


    const polling = (pollingFunc: () => void) => {
      // if errorRetry is enabled, then skip this method
      let timerId: Timeout | undefined;
      if (!isNil(pollingIntervalRef.value) && pollingIntervalRef.value! >= 0) {
        timerId = setTimeout(pollingFunc, pollingIntervalRef.value);
      }
      return () => timerId && clearTimeout(timerId);
    };

    const stopPolling = () => {
      unsubscribeList.forEach(unsubscribe => unsubscribe());
      pollingTimer.value?.();
    }

    onUnmounted(() => {
      stopPolling()
    });

    return {
      onBefore() {
        stopPolling();
      },
      onCancel() {
        stopPolling();
      },
      onAfter() {
         if (queryInstance.error.value && errorRetryCountRef.value !== 0) return;
         if (!pollingWhenHidden && !visible.value) {
           addUnsubscribeList(subscribe(() => queryInstance.context.refresh()));
           return
         }
        pollingTimer.value = polling(() => queryInstance.context.refresh());
      },
    };
  },
);
