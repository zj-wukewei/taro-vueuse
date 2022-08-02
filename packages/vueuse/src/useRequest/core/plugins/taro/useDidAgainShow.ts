import { useDidShow } from "@tarojs/taro";


export default function useDidAgainShow(callback: () => void): void {
  let first = true;
  useDidShow(() => {
    if (!first) {
      callback();
    }
    first = false;
  })
}