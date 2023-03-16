import React from 'react'
import { useAppDispatch } from '@/hooks'
import { setViewState } from '@/store/Reducer/deckglViewStateReducer'

type Props = {
  /** deck.gl 官方未给出具体定义， 也是使用的 any */
  viewState: any
}

/** 控制器按钮 */
const Button: React.FC<{ symbol: string; onClick: () => void }> = ({ symbol, onClick }) => {
  return (
    <div
      className="flex justify-center items-center h-30px w-30px text-[18px] select-none"
      onClick={onClick}
    >
      {symbol}
    </div>
  )
}
/** 地图操作按钮 */
const Controls = ({ viewState }: Props) => {
  const dispatch = useAppDispatch()
  /** 放大，实际上是控制 viewState, 缩小同理 */
  const zoomOut = () => {
    dispatch(
      setViewState({
        ...viewState,
        // 地图存在最大缩放级别，不能超过最大缩放级别，通常为 21
        zoom: Math.min(viewState.zoom + 1, viewState.maxZoom),
      }),
    )
  }
  const zoomIn = () => {
    dispatch(
      setViewState({
        ...viewState,
        // 地图存在最小缩放级别，不能小于最小缩放级别，通常为 1
        zoom: Math.max(viewState.zoom - 1, viewState.minZoom),
      }),
    )
  }
  return (
    <div className="absolute bottom-20px right-20px ease-in-out duration-300 right z-2 w-30px">
      <div className="bg-white rounded-md shadow-md relative">
        <Button symbol="+" onClick={zoomOut} />
        <Button symbol="-" onClick={zoomIn} />
      </div>
    </div>
  )
}

export default Controls
