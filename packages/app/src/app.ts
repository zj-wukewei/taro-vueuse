import { createApp } from 'vue'
import { Button, Toast } from '@nutui/nutui-taro';
import { useUpdateManager } from '@slan-health/taro-vueuse';
import { useProvidingUserState, installUserStore } from './store';

import './app.scss'

const App = createApp({
  onLaunch(options) {
    useUpdateManager({});
  },
  onShow (options) {},
  // provide: () => {
  //   useProvidingUserState();
  // }
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(Button).use(Toast)

installUserStore(App);

export default App
