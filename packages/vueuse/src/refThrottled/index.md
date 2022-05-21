---
title: refThrottled
nav:
  title: Hooks
  path: /hooks
  order: 2
group:
  title: 基础
  path: /basic
---

# refThrottled

用来处理节流ref的 Hook。

## 何时使用

当需要节流的ref

## API

```jsx | pure
const throttledRef =  refThrottled<T>(value: Ref<T>, delay = 200, trailing = true, leading = true);
```

## 参数

| 参数         | 说明                                                                                                      | 类型      | 默认值 |
| ------------ | --------------------------------------------------------------------------------------------------------- | --------- | ------ |
| value | 原始要观察的ref | `Ref` | -      |
| trailing   | 是否在延迟开始后调用函数  | `boolean`   | true
| leading    | 是否在延迟开始前调用函数  | `boolean`   | true

## 返回值说明


| 返回值 | 说明           | 类型                                             |
| ------ | -------------- | ------------------------------------------------ |
| throttledRef   | 经过节流的ref | `Ref` |

## Hook 支持度

| 微信小程序 | H5  | ReactNative |
| :--------: | :-: | :---------: |
|     ✔️     | ✔️  |     ✔️      |
