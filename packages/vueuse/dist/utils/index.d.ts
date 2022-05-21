export * from './types';
import type { Fn, MaybeRef } from './types';
export declare type TimeOutPromise = (time: number) => Promise<number>;
export declare type FunctionArgs<Args extends any[] = any[], Return = void> = (...args: Args) => Return;
export interface FunctionWrapperOptions<Args extends any[] = any[], This = any> {
    fn: FunctionArgs<Args, This>;
    args: Args;
    thisArg: This;
}
export declare type EventFilter<Args extends any[] = any[], This = any> = (invoke: Fn, options: FunctionWrapperOptions<Args, This>) => void;
export interface DebounceFilterOptions {
    /**
     * The maximum time allowed to be delayed before it's invoked.
     * In milliseconds.
     */
    maxWait?: number;
}
export declare const timeOutPromise: TimeOutPromise;
/**
 * @internal
 */
export declare function createFilterWrapper<T extends FunctionArgs>(filter: EventFilter, fn: T): T;
/**
 * Create an EventFilter that debounce the events
 *
 * @param ms
 * @param [maxWait=null]
 */
export declare function debounceFilter(ms: MaybeRef<number>, options?: DebounceFilterOptions): EventFilter<any[], any>;
/**
 * Create an EventFilter that throttle the events
 *
 * @param ms
 * @param [trailing=true]
 * @param [leading=true]
 */
export declare function throttleFilter(ms: MaybeRef<number>, trailing?: boolean, leading?: boolean): EventFilter<any[], any>;
