---
title: useRequest
nav:
  title: Hooks
  path: /hooks
  order: 2
group:
  title: 网络
  path: /network
---

<Alert>注意: 该 Hook 是改写自<a target="__blank" href="https://www.attojs.org/">VueRequest</a>, 更贴合 Taro 使用。demo 和 文档 基本和原 hook 保持一致。</Alert>

# useRequest

数据请求

**核心特性**

- 自动请求/手动请求
- SWR(stale-while-revalidate)
- 缓存/预加载
- 屏幕聚焦重新请求
- 轮询
- 防抖
- 节流
- 并行请求
- 依赖请求
- loading delay
- 分页
- 加载更多，数据恢复 + 滚动位置恢复
- ......

## 何时使用

当需要和服务端进行数据交换时

## API

```jsx | pure
const { data, error, loading, run, params, cancel, refresh, mutate, fetches } =
  useRequest(service, {
    manual,
    initialData,
    refreshDeps,
    onSuccess,
    onError,
    formatResult,
    cacheKey,
    loadingDelay,
    defaultParams,
    pollingInterval,
    pollingWhenHidden,
    fetchKey,
    refreshOnWindowFocus,
    focusTimespan,
    debounceInterval,
    throttleInterval,
    ready,
    throwOnError,
  });
```

## Hook 支持度

| 微信小程序 | H5  | ReactNative |
| :--------: | :-: | :---------: |
|     ✔️     | ✔️  |     ✔️      |
