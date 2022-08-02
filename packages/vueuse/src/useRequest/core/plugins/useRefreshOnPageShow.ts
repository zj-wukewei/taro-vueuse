import { computed } from 'vue';
import useDidAgainShow from './taro/useDidAgainShow';
import { definePlugin } from '../definePlugin';
import { refToRaw } from '../utils';
import limitTrigger from '../utils/limitTrigger';

export default definePlugin(
  (queryInstance, { refreshOnWindowFocus = false, refocusTimespan = 5000 }) => {
    const refocusTimespanRef = computed(() => refToRaw(refocusTimespan));

    refreshOnWindowFocus && useDidAgainShow(() => {
        const limitRefresh = limitTrigger(
          queryInstance.context.refresh,
          refocusTimespanRef.value,
        );
        limitRefresh();
    })

    return {};
  },
);
