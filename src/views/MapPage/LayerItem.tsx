import React from 'react'
import { Tooltip, Popconfirm } from 'antd'
import { center } from '@turf/turf'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { editMapFile, deleteMapFile, type Data } from '@/store/Reducer/mapReducer'
import { setViewState } from '@/store/Reducer/deckglViewStateReducer'
import LayerIcon from '@/assets/icons/layer.svg'
import OpenEyeIcon from '@/assets/icons/openEye.svg'
import CloseEyeIcon from '@/assets/icons/closeEye.svg'
import DeleteIcon from '@/assets/icons/delete.svg'
import { jsonParser } from '@/utils'

type Props = {
  /** 图层序号 */
  index: number
} & Data

/** 图层列表 Item */
const LayerItem = ({ index, name, isShow, file }: Props) => {
  const dispatch = useAppDispatch()
  const viewState = useAppSelector((state) => state.deckglViewStateReducer.deckglViewState)
  const controlShow = () => {
    const data: Data = {
      name,
      file,
      isShow: !isShow,
    }
    dispatch(
      editMapFile({
        index,
        value: data,
      }),
    )
  }
  const onDelete = () => {
    dispatch(deleteMapFile(index))
  }
  const flytoCenter = () => {
    const geojson = jsonParser(file)
    const [longitude, latitude] = center(geojson)?.geometry?.coordinates || []
    dispatch(
      setViewState({
        ...viewState,
        longitude,
        latitude,
      }),
    )
  }
  return (
    <div className="w-full h-32px hover:bg-[#ebecf0] flex items-center justify-between cursor-pointer">
      <div className="flex pl-10px" onClick={flytoCenter}>
        <LayerIcon />
        <span className="pl-4px">{name}</span>
      </div>
      <div className="flex pr-10px items-center justify-center">
        <Tooltip title="删除">
          <Popconfirm
            title="删除图层"
            description="确定要删除该图层么?"
            onConfirm={onDelete}
            okText="确定"
            cancelText="关闭"
          >
            <div className="text-[red] pr-4px">
              <DeleteIcon />
            </div>
          </Popconfirm>
        </Tooltip>
        <Tooltip title={isShow ? '隐藏' : '显示'}>
          <div onClick={controlShow}>{isShow ? <OpenEyeIcon /> : <CloseEyeIcon />}</div>
        </Tooltip>
      </div>
    </div>
  )
}

export default LayerItem
