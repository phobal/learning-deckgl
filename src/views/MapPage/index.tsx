import React, { useState } from 'react'
import { Layout, Button, Empty } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useAppSelector } from '@/hooks'
import Map from './Map'
import Upload from './Upload'
import LayerItem from './LayerItem'

const { Sider, Content } = Layout

type Props = {}

const MapPage = ({}: Props) => {
  const [show, setShow] = useState(false)
  const mapFileList = useAppSelector((state) => state.mapReducer.mapFileList)
  const onOk = () => {
    setShow(false)
  }
  const getLayers = () => {
    return (
      mapFileList
        ?.filter((item) => item.isShow)
        ?.map((item) => {
          return item.file
        }) || []
    )
  }
  return (
    <Layout>
      <Sider width={240} theme="light">
        <div className="pt-40px pl-6px pr-6px relative">
          <div className="h-56px w-full flex justify-between items-baseline">
            <p className="text-[#97a0af] text-base font-16px">地图图层</p>
            <Button
              className="text-[#0065ff]"
              type="text"
              icon={<UploadOutlined />}
              onClick={() => setShow(true)}
            >
              导入
            </Button>
          </div>
          <div className="pt-40px">
            {mapFileList.length > 0 ? (
              mapFileList.map((file, index) => (
                <LayerItem
                  index={index}
                  key={`${index}-${file.name}`}
                  name={file.name}
                  file={file.file}
                  isShow={file.isShow}
                />
              ))
            ) : (
              <Empty description="还没有图层哦，请点击上方导入按钮添加图层" />
            )}
          </div>
        </div>
      </Sider>
      <Content className="relative">
        <Map layers={getLayers()} />
      </Content>
      <Upload show={show} mapFileList={mapFileList} onCancel={() => setShow(false)} onOk={onOk} />
    </Layout>
  )
}

export default React.memo(MapPage)
