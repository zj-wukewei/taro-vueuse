import { createApp } from 'vue'
import { Button, Toast } from '@nutui/nutui-taro';

import './app.scss'

const App = createApp({
  onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

console.log("aaaaaa", App)
App.config.globalProperties = {
  framework: 'vue',
  package: 'taro-vueuse',
  basic: 'taro',
}

App.use(Button).use(Toast)

export default App
