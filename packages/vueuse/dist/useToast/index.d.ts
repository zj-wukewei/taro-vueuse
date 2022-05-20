export interface ToastOption {
    title: string;
    duration?: number;
    icon?: 'success' | 'loading' | 'none' | 'error';
    image?: string;
    mask?: boolean;
}
export declare type ShowToast = (option?: Partial<ToastOption>) => Promise<TaroGeneral.CallbackResult>;
export declare type ShowStringToast = (title: string) => Promise<TaroGeneral.CallbackResult>;
export declare type HideToast = () => Promise<TaroGeneral.CallbackResult>;
declare function useToast(initialOption?: Partial<ToastOption>): [{
    showToastAsync: ShowToast;
    showSuccessAsync: ShowStringToast;
    showErrorAsync: ShowStringToast;
    showNoneAsync: ShowStringToast;
    showNoneTimeoutAsync: (title: string) => Promise<number>;
}, HideToast];
export default useToast;
