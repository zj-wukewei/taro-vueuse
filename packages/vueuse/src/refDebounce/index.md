---
title: refDebounce
nav:
  title: Hooks
  path: /hooks
  order: 2
group:
  title: 基础
  path: /basic
---

# refThrottled

用来处理防抖ref的 Hook。

## 何时使用

当需要节流的ref

## API

```jsx | pure
const debounceRef = refDebounce<T>(value: Ref<T>, ms = 200, options: DebounceFilterOptions = {});
```

## 参数

| 参数         | 说明                                                                                                      | 类型      | 默认值 |
| ------------ | --------------------------------------------------------------------------------------------------------- | --------- | ------ |
| value | 原始要观察的ref | `Ref` | -      |
| ms      | 等待时间，单位为毫秒 | `MaybeRef` | 200      |
| options | 配置防抖的行为     | `Options`                 | {}      |


## 返回值说明


| 返回值 | 说明           | 类型                                             |
| ------ | -------------- | ------------------------------------------------ |
| debounceRef   | 经过防抖的ref | `Ref` |

## Hook 支持度

| 微信小程序 | H5  | ReactNative |
| :--------: | :-: | :---------: |
|     ✔️     | ✔️  |     ✔️      |
