import React, { useState } from 'react'
import { Modal, Upload as AntdUpload, type UploadProps, message } from 'antd'
import GeoJSONSVG from '@/assets/icons/geojson.svg'
import { useAppDispatch } from '@/hooks'
import { addMapFile, type Data } from '@/store/Reducer/mapReducer'

const { Dragger } = AntdUpload

type Props = {
  show: boolean
  mapFileList: Data[]
  onCancel: () => void
  onOk: () => void
}

const Upload = ({ show, mapFileList, onCancel, onOk }: Props) => {
  const [geoFile, setGeoFile] = useState<Data>()
  const dispatch = useAppDispatch()
  const props: UploadProps = {
    accept: '.geojson',
    beforeUpload: (file) => {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        const isExistName = mapFileList.some(
          (item) => item.name === file?.name?.replace('.geojson', ''),
        )
        if (!isExistName) {
          setGeoFile({
            file: JSON.stringify(reader.result),
            name: file?.name?.replace('.geojson', ''),
            isShow: true,
          })
        } else {
          message.error('已存在相同图层，请重新上传')
        }
      }
      return false
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }
  const onSubmit = () => {
    dispatch(addMapFile(geoFile!))
    onOk()
  }
  return (
    <Modal
      destroyOnClose
      open={show}
      title="导入数据"
      okText="确认"
      cancelText="取消"
      okButtonProps={{
        disabled: geoFile === undefined,
      }}
      onCancel={onCancel}
      onOk={onSubmit}
    >
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <GeoJSONSVG />
        </p>
        <p className="ant-upload-text">点击上传或拖拽文件在此处</p>
        <p className="ant-upload-hint">只支持 GeoJSON 格式</p>
      </Dragger>
    </Modal>
  )
}

export default Upload
