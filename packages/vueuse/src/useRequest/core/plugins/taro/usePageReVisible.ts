import { isWeb } from './utils';
import useDidAgainShow from './useDidAgainShow';
import useVisible from '../../../../useVisible';


export default function usePageReVisible() {
  const visible = useVisible();
  const listeners: any[] = [];
  const subscribe = (listener: () => void) => {
    listeners.push(listener);
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }
  const revalidate = () => {
    if (!visible.value) return;
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  };

  if (isWeb) {
    window.addEventListener('visibilitychange', revalidate, false);
  } else {
    useDidAgainShow(revalidate);
  }

  return {
    subscribe,
    visible
  };
}