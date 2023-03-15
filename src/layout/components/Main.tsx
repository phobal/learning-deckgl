import React, { type ReactNode } from 'react'
import { Layout } from 'antd'

interface Props {
  style?: React.CSSProperties | undefined
  className?: string
  children?: ReactNode
}

const { Content } = Layout

const Main: React.FC<Props> = ({ children, style, className = '' }) => {
  return (
    <Content
      style={style}
      className={`flex text-black items-center justify-start flex-col pl-4px pb-4px pr-4px overflow-auto relative ${
        className ?? ''
      }`}
    >
      {children}
    </Content>
  )
}

export default Main
