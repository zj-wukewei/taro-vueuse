---
title: useStorage
nav:
  title: Hooks
  path: /hooks
  order: 2
group:
  title: 基础
  path: /basic
---

# useStorage

数据缓存

## 何时使用

当需持久化数据时

## API

```jsx | pure
const { getSync, set, get, remove } = useStorage();
```

## 参数说明

无

## 返回值说明

| 返回值      | 说明          | 类型                                                                                    |
| ----------- | ------------- | --------------------------------------------------------------------------------------- |
| getSync | 同步获取缓存  | `(key?: string) => any`  |
| set         | 设置缓存      | `(key: string, data: any) => Promise<boolean>`                                          |
| get         | 获取缓存      | `(key?: string) => Promise<any> 若不指定key, 则默认获取所有`                            |
| remove      | 移除/清除缓存 | `(key?: string) => Promise<boolean> 若不指定key, 则默认移除所有`                        |

## Hook 支持度

| 微信小程序 | H5  | ReactNative |
| :--------: | :-: | :---------: |
|     ✔️     | ✔️  |     ✔️      |
