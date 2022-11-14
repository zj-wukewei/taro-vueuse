---
title: useThrottleFn
nav:
  title: Hooks
  path: /hooks
  order: 2
group:
  title: 基础
  path: /basic
---

<Alert>注意: 该 Hook 是改写自<a target="__blank" href="https://github.com/vueuse/vueuse/blob/main/packages/shared/useThrottleFn/index.ts">vueuse useThrottle</a></Alert>

# useThrottleFn

用来处理节流函数的 Hook。

## 何时使用

当需处理节流值

## API

```typescript
const throttledFunction = useThrottleFn<T extends FunctionArgs>(fn: T, ms: MaybeRef<number> = 200, trailing = true, leading = true);
```

### Params

| 参数    | 说明           | 类型      | 默认值 |
| ------- | -------------- | --------- | ------ |
| fn      | 函数      |   `FunctionArgs`  | -      |
| ms      | 节流的时间  | `number`   | 200ms
| trailing   | 是否在延迟开始后调用函数  | `boolean`   | true
| leading    | 是否在延迟开始前调用函数  | `boolean`   | true

## 返回值说明

| 返回值 | 说明           | 类型                                             |
| ------ | -------------- | ------------------------------------------------ |
| throttledFunction   | 调用函数 | `FunctionArgs` |

## 代码演示

```jsx | pure
<script>
import { useThrottleFn } from '@slan-health/taro-vueuse';
export default {
  name: 'use-ThrottleFn',
  components: {},
  setup() {
    const fn  = useThrottleFn(() => {
      console.log("useThrottleFn200ms")
    }, 1000);
    console.log("fnfn", fn);
    const handleOnClick = () => {
      console.log("handleOnClick");
      fn();
    }

    return {
      handleOnClick
    };
  },
};
</script>
```


## Hook 支持度

| 微信小程序 | H5  | ReactNative |
| :--------: | :-: | :---------: |
|     ✔️     | ✔️  |     ✔️      |
