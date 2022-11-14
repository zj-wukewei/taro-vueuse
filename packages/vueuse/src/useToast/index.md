---
title: useToast
nav:
  title: Hooks
  path: /hooks
  order: 2
group:
  title: 操作反馈
  path: /feedback
---

# useToast

显示或隐藏消息提示框

## 何时使用

当需要使用消息提示框

## API

```jsx | pure
const [{
      showToastAsync,
      showSuccessAsync,
      showErrorAsync,
      showNoneAsync,
      showNoneTimeoutAsync,
    }, hide] = useToast(initialOption);
```

## 参数说明

| 参数          | 说明                                       | 类型                 | 默认值 |
| ------------- | ------------------------------------------ | -------------------- | ------ |
| initialOption | 初始提示框配置(若指定后面可与新的配置合并) | `General.IAnyObject` | -      |

## 返回值说明

| 返回值 | 说明           | 类型                                             |
| ------ | -------------- | ------------------------------------------------ |
| showToastAsync   | 显示消息提示框 | `(options?: General.IAnyObject) => Promise<any>` |
| showSuccessAsync   | 显示成功消息提示框 | `(title: string) => Promise<any>` |
| showErrorAsync   | 显示失败消息提示框 | `(title: string) => Promise<any>` |
| showNoneAsync   | 显示无图标消息提示框 | `(title: string) => Promise<any>` |
| showNoneTimeoutAsync   | 显示无图标消息提示框后延迟1500毫秒调用 | `(title: string) => Promise<any>` |
| hide   | 隐藏提示框     | `() => Promise<any>`                             |

## 代码演示

```jsx | pure
<script>
import { useToast } from '@slan-health/taro-vueuse';
export default {
  name: 'use-toast',
  components: {},
  setup() {
    const [{ showNoneAsync, showNoneTimeoutAsync }, hide] = useToast();

    const handleClick = () => {
      showNoneAsync('showNoneAsync').then(() => console.log("立马输出"));
    };

 const handleTimeOutClick = () => {
      showNoneTimeoutAsync('showNoneTimeoutAsync').then(() => console.log("1.5s输出"));;
    };
    return {
      handleClick,
      handleTimeOutClick
    };
  },
};
</script>
```


## Hook 支持度

| 微信小程序 | H5  | ReactNative |
| :--------: | :-: | :---------: |
|     ✔️     | ✔️  |     ✔️      |
