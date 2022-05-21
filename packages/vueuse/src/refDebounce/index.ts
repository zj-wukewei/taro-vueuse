import type { Ref } from 'vue';
import { ref, watch } from 'vue';
import useDebounceFn  from '../useDebounceFn';
import type { DebounceFilterOptions } from '../utils'


export default function refDebounce<T>(value: Ref<T>, ms = 200, options: DebounceFilterOptions = {}) : Readonly<Ref<T>> {
  if (ms <= 0)
    return value

  const throttled: Ref<T> = ref(value.value as T) as Ref<T>

  const updater = useDebounceFn(() => {
    throttled.value = value.value
  }, ms, options)

  watch(value, () => updater())

  return throttled
}