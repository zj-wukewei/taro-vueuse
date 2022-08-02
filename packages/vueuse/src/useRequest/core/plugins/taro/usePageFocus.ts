import { isWeb } from './utils';
import useDidAgainShow from './useDidAgainShow';
import useVisible from '../../../../useVisible';
import useOnline from '../../../../useOnline';

export default function usePageFocus() {
  const visible = useVisible();
  const isOnline = useOnline(); 
  const listeners: any[] = [];
  const subscribe = (listener: () => void) => {
    listeners.push(listener);
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }
  const revalidate = () => {
    if (!visible.value || !isOnline.value) return;
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  };

  if (isWeb) {
    window.addEventListener('visibilitychange', revalidate, false);
    window.addEventListener('focus', revalidate, false);
  } else {
    useDidAgainShow(revalidate);
  }

  return subscribe;
}