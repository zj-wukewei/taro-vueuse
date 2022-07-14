---
title: useLogin
nav:
  title: Hooks
  path: /hooks
  order: 2
group:
  title: 小程序
  path: /wechat
---

# useLogin

获取登录凭证, 检查登录状态

## 何时使用

当需要获取登录凭证, 检查登录状态

## API

```jsx | pure
const { checkSessionSync, loginSync, getPhoneNumer } = useLogin();
```

## 返回值说明

| 返回值       | 说明                                                                    | 类型                                                        |
| ------------ | ----------------------------------------------------------------------- | ----------------------------------------------------------- |
| loginSync        | 获取登录凭证(若`needCheck`为`true`则自动检测当前登录状态来进行登录操作) | `(needCheck?: boolean) => Promise<string &#124; undefined>` |
| checkSession | 检查登录状态                                                            | `() => Promise<General.CallbackResult>`                     |
| getPhoneNumer | 获取解析手机号码需要的数据                                      | `(e: any) => Promise<data>`                     |

## Hook 支持度

| 微信小程序 | H5  | ReactNative |
| :--------: | :-: | :---------: |
|     ✔️     |     |             |

## FAQ

- [login](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html)
- [checkSession](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.checkSession.html)
