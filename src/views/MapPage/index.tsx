import React, { useState, useCallback } from 'react'
import Map from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import DeckGL from '@deck.gl/react/typed'
import { debounce } from 'lodash'
import Controls from './Controls'

type Props = {}

// @ts-ignore
mapboxgl.accessToken = MapboxAccessToken

const INITIAL_VIEW_STATE = {
  longitude: 116.46,
  latitude: 39.92,
  zoom: 4,
}
const MapPage = ({}: Props) => {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE)
  // 监听地图视图的变化，变化后从新 setViewState, 从而触发地图的重新渲染
  const onViewStateChange = debounce((viewStateProps) => {
    const { viewState } = viewStateProps
    setViewState(viewState)
  }, 200)
  const setViewStateFunc = useCallback(setViewState, [setViewState])
  return (
    <DeckGL
      controller
      initialViewState={{ ...viewState }}
      style={{ width: '100%', height: '100%' }}
      onViewStateChange={onViewStateChange}
    >
      <Map attributionControl mapStyle="mapbox://styles/mapbox/light-v10" />
      <Controls viewState={viewState} setViewState={setViewStateFunc} />
    </DeckGL>
  )
}

export default MapPage
