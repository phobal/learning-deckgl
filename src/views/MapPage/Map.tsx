import React, { useState, useCallback } from 'react'
import Map, { Source, Layer } from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import { debounce } from 'lodash'
import DeckGL from '@deck.gl/react/typed'
import { jsonParser } from '@/utils'
import Controls from './Controls'

type Props = {
  layers: string[]
}

// @ts-ignore
mapboxgl.accessToken = MapboxAccessToken

const INITIAL_VIEW_STATE = {
  longitude: 114.17092065590319,
  latitude: 22.639811698157267,
  zoom: 9.4,
}
const MapPage = ({ layers }: Props) => {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE)
  // 监听地图视图的变化，变化后从新 setViewState, 从而触发地图的重新渲染
  const onViewStateChange = debounce((viewStateProps) => {
    const { viewState } = viewStateProps
    setViewState(viewState)
  }, 200)
  const setViewStateFunc = useCallback(setViewState, [setViewState])
  const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#3c71f6',
    },
  }
  return (
    <DeckGL
      controller
      initialViewState={{ ...viewState }}
      style={{ width: '100%', height: '100%' }}
      onViewStateChange={onViewStateChange}
    >
      <Map attributionControl mapStyle="mapbox://styles/mapbox/light-v10">
        {layers.map((layer, index) => (
          <Source
            key={`layer-${index}`}
            id={`layer-${index}`}
            type="geojson"
            data={jsonParser(layer)}
          >
            {
              // @ts-ignore
              <Layer {...layerStyle} />
            }
          </Source>
        ))}
      </Map>
      <Controls viewState={viewState} setViewState={setViewStateFunc} />
    </DeckGL>
  )
}

export default MapPage
