import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Layout } from 'antd'
import type { BasicProps as HeaderProps } from 'antd/lib/layout/layout'
import DataIconSvg from '@/assets/icons/data.svg'
import MapIconSvg from '@/assets/icons/map.svg'

type Props = {} & HeaderProps

const { Header: AntdHeader } = Layout

const Header = (props: Props) => {
  const { pathname } = useLocation()
  const isDataPage = pathname.includes('/map/data')
  const isMapPage = pathname.includes('/map/map')
  return (
    <AntdHeader className="pl-24px pr-24px h-48px" {...props}>
      <div className="flex justify-center items-center h-48px">
        <Link
          className={`flex justify-center items-center w-65px h-30px ml-8px cursor-pointer rounded-md text-[#c2c7cf] hover:text-white ${
            isDataPage ? 'bg-[#424d61] text-white' : ''
          }`}
          to="/map/data"
        >
          <DataIconSvg />
          <span className="pl-4px">数据</span>
        </Link>
        <Link
          className={`flex justify-center items-center w-65px h-30px ml-8px cursor-pointer rounded-md text-[#c2c7cf] hover:text-white ${
            isMapPage ? 'bg-[#424d61] text-white' : ''
          }`}
          to="/map/map"
        >
          <MapIconSvg />
          <span className="pl-4px">地图</span>
        </Link>
      </div>
    </AntdHeader>
  )
}

export default Header
