---
title: useVModel
nav:
  title: Hooks
  path: /hooks
  order: 2
group:
  title: 基础
  path: /basic
---

# useVModel

Shorthand for v-model binding, props + emit -> ref

## 何时使用

Shorthand for v-model binding, props + emit -> ref

## API

```jsx | pure
const data = useVModel(props, 'data', emit)
```

## 参数

| 参数         | 说明                                                                                                      | 类型      | 默认值 |
| ------------ | --------------------------------------------------------------------------------------------------------- | --------- | ------ |
| props | 组件props | `object` | -      |
| key   | 双向绑定的名字  | `(name: Name, ...args: any[]) => void`   | 
| emit    | 发送事件emit  | ``   | true
| options    | 是否在延迟开始前调用函数  | `VModelOptions`   | 

## 返回值说明


| 返回值 | 说明           | 类型                                             |
| ------ | -------------- | ------------------------------------------------ |
| data   | 和props的key响应的ref | `Ref` |

## Hook 支持度

| 微信小程序 | H5  | ReactNative |
| :--------: | :-: | :---------: |
|     ✔️     | ✔️  |     ✔️      |
