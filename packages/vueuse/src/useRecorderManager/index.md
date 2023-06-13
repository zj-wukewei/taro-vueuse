---
title: useRecorderManager
nav:
  title: Hooks
  path: /hooks
  order: 2
group:
  title: 小程序
  path: /wechat
---

# useRecorderManager

录音功能

## 何时使用

用户需要录音

## API

```jsx | pure
const [recorderManager, { startRecorder, stopRecorder, pauseRecorder }] = useRecorderManager({
  onStart: () => console.log('onStart'),
  onPause: () => console.log('onPause'),
  onStop: (voice) => console.log('onStop', voice),
  onError: (error) => console.log('onError', error),
  recorderStatus: () => recorderStatus.value,
});
```

## 参数说明

| 参数           | 说明                 | 类型                                      | 默认值 |
| -------------- | -------------------- | ----------------------------------------- | ------ |
| onStart        | 监听录音开始事件     | (res: TaroGeneral.CallbackResult) => void | 无     |
| onPause        | 监听录音暂停事件     | (res: TaroGeneral.CallbackResult) => void | 无     |
| onStop         | 监听录音结束事件     | OnStopCallback                            | 无     |
| onError        | 监听录音错误事件     | OnErrorCallback                           | 无     |
| recorderStatus | 是否在授权完成后录音 | () => boolean                             | false  |

## 返回值说明

| 返回值          | 说明                 | 类型                         |
| --------------- | -------------------- | ---------------------------- |
| recorderManager | 全局唯一的录音管理器 |
| startRecorder   | 开启录音功能         | (options: StartOption) => {} |
| stopRecorder    | 结束录音             | () => {}                     |
| pauseRecorder   | 暂停录音             | () => {}                     |

## Hook 支持度

| 微信小程序 | H5  | ReactNative |
| :--------: | :-: | :---------: |
|     ✔️     |     |             |
