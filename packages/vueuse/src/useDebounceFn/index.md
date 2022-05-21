---
title: useDebounceFn
nav:
  title: Hooks
  path: /hooks
  order: 2
group:
  title: 基础
  path: /basic
---

<Alert>注意: 该 Hook 是改写自<a target="__blank" href="https://github.com/vueuse/vueuse/blob/main/packages/shared/useDebounceFn/index.ts">vueuse useDebounce</a></Alert>

# useDebounceFn

用来处理防抖函数的 Hook。

## 何时使用

当需处理防抖函数。

## API

```jsx | pure
const debounceFn = useDebounceFn<T extends FunctionArgs>(fn: T, ms: MaybeRef<number> = 200, options: DebounceFilterOptions = {})
```

### Params

| 参数    | 说明               | 类型                      | 默认值 |
| ------- | ------------------ | ------------------------- | ------ |
| fn      | 需要防抖执行的函数 | `(...args: any[]) => any` | -      |
| ms      | 等待时间，单位为毫秒 | `MaybeRef` | 200      |
| options | 配置防抖的行为     | `Options`                 | {}      |

### Options

| 参数     | 说明                     | 类型      | 默认值  |
| -------- | ------------------------ | --------- | ------- |
| maxWait  | 最大等待时间，单位为毫秒 | `number`  | -       |

### Result

| 参数   | 说明                               | 类型                      |
| ------ | ---------------------------------- | ------------------------- |
| debounceFn    | 触发执行 fn，函数参数将会传递给 fn | `(...args: any[]) => any` |


## Hook 支持度

| 微信小程序 | H5  | ReactNative |
| :--------: | :-: | :---------: |
|     ✔️     | ✔️  |     ✔️      |
