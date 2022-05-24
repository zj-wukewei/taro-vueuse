---
title: createInjectionState
nav:
  title: Hooks
  path: /hooks
  order: 2
group:
  title: 基础
  path: /basic
---

# createInjectionState

创建全局的state。

## 何时使用

全局数据共享

## API

```jsx | pure
const [useProvidingState, useInjectedState, install] = createInjectionState<Arguments extends Array<any>,Return>(composable: (...args: Arguments) => Return);
```

## 参数

| 参数         | 说明                                                                                                      | 类型      | 默认值 |
| ------------ | --------------------------------------------------------------------------------------------------------- | --------- | ------ |
| composable |初始化函数 | `(...args: Arguments) => Return` | -      |


## 返回值说明


| 返回值 | 说明           | 类型                                             |
| ------ | -------------- | ------------------------------------------------ |
| useProvidingState   | 注册全局的state | `(...args: Arguments) => void` |
| useInjectedState   | 提供注册的state | `() => Return` |
| install   | 在app使用注册 | `(app: App, ...args: Arguments) => void` |

## Hook 支持度

| 微信小程序 | H5  | ReactNative |
| :--------: | :-: | :---------: |
|     ✔️     | ✔️  |     ✔️      |
