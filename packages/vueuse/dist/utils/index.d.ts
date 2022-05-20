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
export declare const timeOutPromise: TimeOutPromise;
/**
 * @internal
 */
export declare function createFilterWrapper<T extends FunctionArgs>(filter: EventFilter, fn: T): T;
/**
 * Create an EventFilter that throttle the events
 *
 * @param ms
 * @param [trailing=true]
 * @param [leading=true]
 */
export declare function throttleFilter(ms: MaybeRef<number>, trailing?: boolean, leading?: boolean): EventFilter<any[], any>;
