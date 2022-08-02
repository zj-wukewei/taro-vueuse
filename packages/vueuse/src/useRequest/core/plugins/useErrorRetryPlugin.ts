import { computed, ref } from 'vue';

import { definePlugin } from '../definePlugin';
import { refToRaw } from '../utils';
import type { Timeout } from '../utils/types';

export default definePlugin(
  (queryInstance, { errorRetryCount = 0, errorRetryInterval = 0 }) => {
    const retryTimer = ref();
    const retriedCount = ref(0);
    const errorRetryCountRef = computed(() => refToRaw(errorRetryCount));
    const errorRetryIntervalRef = computed(() => refToRaw(errorRetryInterval));

    let isRetrying = false;

    // reset retried count
    const resetRetriedCount = () => {
      retriedCount.value = 0;
    };

    const actualErrorRetryInterval = computed(() => {
      if (errorRetryIntervalRef.value) return errorRetryIntervalRef.value;
      const baseTime = 1000;
      const minCoefficient = 1;
      const maxCoefficient = 9;
      // When retrying for the first time, in order to avoid the coefficient being 0
      // so replace 0 with 2, the coefficient range will become 1 - 2
      const coefficient = Math.floor(
        Math.random() * 2 ** Math.min(retriedCount.value, maxCoefficient) +
          minCoefficient,
      );
      return baseTime * coefficient;
    });

    const errorRetryHooks = () => {
      let timerId: Timeout | undefined;
      const isInfiniteRetry = errorRetryCountRef.value === -1;
      const hasRetryCount = retriedCount.value < errorRetryCountRef.value;

      // if errorRetryCount is -1, it will retry the request until it success
      if (isInfiniteRetry || hasRetryCount) {
        if (!isInfiniteRetry) retriedCount.value += 1;
        timerId = setTimeout(() => {
          isRetrying = true;
          queryInstance.context.refresh();
        }, actualErrorRetryInterval.value);
      }
      return () => timerId && clearTimeout(timerId);
    };

    // clear retryTimer
    const clearTimer = () => {
      if (retryTimer.value) {
        retryTimer.value();
      }
    };

    return {
      onBefore() {
        if (!isRetrying) {
          resetRetriedCount();
        }
        isRetrying = false;

        clearTimer();
      },
      onSuccess() {
        resetRetriedCount();
      },
      onError() {
        retryTimer.value = errorRetryHooks();
      },
      onCancel() {
        // TODO: Whether to reset the count when `onCancel`
        resetRetriedCount();
        clearTimer();
      },
    };
  },
);
