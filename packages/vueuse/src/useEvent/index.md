---
title: useEvent
nav:
  title: Hooks
  path: /hooks
  order: 2
group:
  title: 基础
  path: /basic
---

# useEvent

消息机制

## 何时使用

当需要全局消息机制时

## API

```jsx | pure
const [
  emitEvent,
  setListener,
  removeAllListener
] = useEvent(namespace: string);
```

## 返回值说明

| 返回值   | 说明                       | 类型       |
| -------- | -------------------------- | ---------- |
| emitEvent    | 当前所有事件名称和事件映射 | `TEmitEventAction`   |
| setListener | 设置监听         | `TSetListenerAction` |
| removeAllListener | 暴露副作用方法             | `() => void` |

### 方法

```tsx | pure
// 设置监听支持同时绑定多个方法
setListener(eventName: string, handler1: () => void, handler2: () => void, ...);
// 监听一次
setListener(eventName: string, handler: () => void);
// 移除监听
removeAllListener(eventName: string, handler: () => void);
// 触发事件
emitEvent(eventName: string, arg1: any, arg2?: any, ...)
```
## Hook 支持度

| 微信小程序 | H5  | ReactNative |
| :--------: | :-: | :---------: |
|     ✔️     | ✔️  |     ✔️      |
