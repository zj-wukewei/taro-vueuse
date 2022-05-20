import type { RouterInfo } from '@tarojs/taro';
export declare type TRecord<R = any> = {
    [_: string]: R;
};
export declare type TAuthResultType = 'accept' | 'reject' | 'ban';
export declare type TNormalAction<T = TaroGeneral.CallbackResult> = () => Promise<T>;
export declare type TGeneralCallback<T = TaroGeneral.CallbackResult, R = void> = (callbackResult: T) => R;
export declare type TRouteInfo = RouterInfo<Partial<Record<string, string>>>;
export declare type TPartialRouteInfo<R = {}> = TRouteInfo | R;
