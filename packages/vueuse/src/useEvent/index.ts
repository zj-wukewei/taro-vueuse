import Taro from '@tarojs/taro';
import { onMounted, onUnmounted } from 'vue';

export const safeNamespace = ['__taro', 'at'];
export type eventHandler = (...args: any[]) => void;
export type TEmitEventAction = (eventName: string, ...params: any[]) => void;
export type TSetListenerAction = (eventName: string, ...handlers: eventHandler[]) => void;

export function wrapperEvent(namespace: string, eventName: string): string {
  return namespace ? `${namespace}.${eventName}` : eventName;
}

const createEventCenter = () => Taro.eventCenter;

function useEvent(namespace: string) {
  const events = createEventCenter();

  const emitEvent: TEmitEventAction = (eventName, ...params) => {
    if (!eventName) {
      console.warn('eventName not provide');
      return;
    }
    const realEventName = wrapperEvent(namespace, eventName);
    events.trigger(realEventName, params);
  };

  const setListener: TSetListenerAction = (eventName, ...handlers) => {
    if (!eventName || safeNamespace.some((v) => eventName.startsWith(v))) {
      console.warn('eventName not valid. listen failed');
    } else if (!handlers.length) {
      console.warn('you mast provide one handler to listen. add failed');
    } else {
      const realEventName = wrapperEvent(namespace, eventName);
      onMounted(() => {
        handlers.forEach((handler) => {
          events.on(realEventName, handler);
        });
      });

      onUnmounted(() => {
        events.off(realEventName);
      });
    }
  };

  const removeAllListener = () => {
    events.off();
  }

  return {
    emitEvent,
    setListener,
    removeAllListener
  };
}

export default useEvent;
