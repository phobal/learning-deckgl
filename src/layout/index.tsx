import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { ConfigProvider } from 'antd'
import Header from '@/layout/components/Header'
import Main from '@/layout/components/Main'

const Default: React.FC = () => {
  return (
    <Layout>
      <ConfigProvider
        theme={{
          token: {
            colorTextBase: '#ffffff',
          },
        }}
      >
        <Header />
      </ConfigProvider>
      <Main>
        <Outlet />
      </Main>
    </Layout>
  )
}

export default Default
