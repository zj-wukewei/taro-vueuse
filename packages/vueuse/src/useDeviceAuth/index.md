---
title: useDeviceAuth
nav:
  title: Hooks
  path: /hooks
  order: 2
group:
  title: 小程序
  path: /wechat
---

# useDeviceAuth

申请设备权限

## 何时使用

当需要用户授权时

## API

```jsx | pure
const [requestDeviceAuth] = useDeviceAuth();
requestDeviceAuth(DeviceAuthOption);
```

## 返回值说明

| 返回值            | 说明     | 类型                                           |
| ----------------- | -------- | ---------------------------------------------- |
| requestDeviceAuth | 申请权限 | `(options?: DeviceAuthOption) => Promise<any>` |

## Hook 支持度

| 微信小程序 | H5  | ReactNative |
| :--------: | :-: | :---------: |
|     ✔️     |     |             |
