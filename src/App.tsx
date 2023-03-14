import React from 'react'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import { Routes } from '@/router'
import { store } from '@/store'
import lightTheme from '@/theme/light'

import 'virtual:windi.css'
import 'virtual:windi-devtools'
import 'antd/dist/reset.css'
import '@/assets/index.css'

const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider theme={lightTheme}>
        <Routes />
      </ConfigProvider>
    </Provider>
  )
}

export default App
