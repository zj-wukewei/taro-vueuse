export * from './types'

import { unref } from 'vue';
import type { Fn, MaybeRef } from './types';

export type TimeOutPromise = (time: number) => Promise<number>

export type FunctionArgs<Args extends any[] = any[], Return = void> = (...args: Args) => Return

export interface FunctionWrapperOptions<Args extends any[] = any[], This = any> {
  fn: FunctionArgs<Args, This>
  args: Args
  thisArg: This
}

export type EventFilter<Args extends any[] = any[], This = any> = (
  invoke: Fn,
  options: FunctionWrapperOptions<Args, This>
) => void

export interface DebounceFilterOptions {
  /**
   * The maximum time allowed to be delayed before it's invoked.
   * In milliseconds.
   */
  maxWait?: number
}


export const timeOutPromise: TimeOutPromise = (time: number) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(time);
      }, time)
    } catch (error) {
      reject();
    }
  })
}

/**
 * @internal
 */
 export function createFilterWrapper<T extends FunctionArgs>(filter: EventFilter, fn: T) {
  function wrapper(this: any, ...args: any[]) {
    filter(() => fn.apply(this, args), { fn, thisArg: this, args })
  }

  return wrapper as any as T
}


/**
 * Create an EventFilter that debounce the events
 *
 * @param ms
 * @param [maxWait=null]
 */
 export function debounceFilter(ms: MaybeRef<number>, options: DebounceFilterOptions = {}) {
  let timer: ReturnType<typeof setTimeout> | undefined
  let maxTimer: ReturnType<typeof setTimeout> | undefined | null

  const filter: EventFilter = (invoke) => {
    const duration = unref(ms)
    const maxDuration = unref(options.maxWait)

    if (timer)
      clearTimeout(timer)

    if (duration <= 0 || (maxDuration !== undefined && maxDuration <= 0)) {
      if (maxTimer) {
        clearTimeout(maxTimer)
        maxTimer = null
      }
      return invoke()
    }

    // Create the maxTimer. Clears the regular timer on invokation
    if (maxDuration && !maxTimer) {
      maxTimer = setTimeout(() => {
        if (timer)
          clearTimeout(timer)
        maxTimer = null
        invoke()
      }, maxDuration)
    }

    // Create the regular timer. Clears the max timer on invokation
    timer = setTimeout(() => {
      if (maxTimer)
        clearTimeout(maxTimer)
      maxTimer = null
      invoke()
    }, duration)
  }

  return filter
}



/**
 * Create an EventFilter that throttle the events
 *
 * @param ms
 * @param [trailing=true]
 * @param [leading=true]
 */
 export function throttleFilter(ms: MaybeRef<number>, trailing = true, leading = true) {
  let lastExec = 0
  let timer: ReturnType<typeof setTimeout> | undefined
  let isLeading = true

  const clear = () => {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }
  }

  const filter: EventFilter = (invoke) => {
    const duration = unref(ms)
    const elapsed = Date.now() - lastExec

    clear()

    if (duration <= 0) {
      lastExec = Date.now()
      return invoke()
    }

    if (elapsed > duration && (leading || !isLeading)) {
      lastExec = Date.now()
      invoke()
    }
    else if (trailing) {
      timer = setTimeout(() => {
        lastExec = Date.now()
        isLeading = true
        clear()
        invoke()
      }, duration)
    }

    if (!leading && !timer)
      timer = setTimeout(() => isLeading = true, duration)

    isLeading = false
  }

  return filter
}