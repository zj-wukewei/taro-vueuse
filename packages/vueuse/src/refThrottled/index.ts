import type { Ref } from 'vue';
import { ref, watch } from 'vue';
import useThrottleFn  from '../useThrottleFn';


export default function refThrottled<T>(value: Ref<T>, delay = 200, trailing = true, leading = true) {
  if (delay <= 0)
    return value

  const throttled: Ref<T> = ref(value.value as T) as Ref<T>

  const updater = useThrottleFn(() => {
    throttled.value = value.value
  }, delay, trailing, leading)

  watch(value, () => updater())

  return throttled
}