import React from 'react'
import { Spin } from 'antd'
import type { SpinProps } from 'antd/lib/spin'

type Props = {} & SpinProps

const Loading = (props: Props) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spin {...props} />
    </div>
  )
}

export default Loading
