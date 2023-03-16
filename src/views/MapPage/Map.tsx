import React, { useMemo } from 'react'
import Map from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import { debounce } from 'lodash'
import DeckGL from '@deck.gl/react/typed'
import { GeoJsonLayer } from '@deck.gl/layers/typed'
import { jsonParser } from '@/utils'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { setViewState } from '@/store/Reducer/deckglViewStateReducer'
import Controls from './Controls'

type Props = {
  layers: string[]
}

// @ts-ignore
mapboxgl.accessToken = MapboxAccessToken

const MapPage = ({ layers }: Props) => {
  const dispatch = useAppDispatch()
  const viewState = useAppSelector((state) => state.deckglViewStateReducer.deckglViewState)
  // 监听地图视图的变化，变化后从新 setViewState, 从而触发地图的重新渲染
  const onViewStateChange = debounce((viewStateProps) => {
    dispatch(setViewState(viewStateProps?.viewState))
  }, 200)
  const layerStyle = {
    pickable: true,
    stroked: false,
    filled: true,
    extruded: true,
    pointType: 'circle',
    getFillColor: [42, 99, 246, 200],
    getPointRadius: 200,
  }
  const geojsonLayers = useMemo(() => {
    return layers.map((layer, index) => {
      // @ts-ignore
      return new GeoJsonLayer({
        id: `layer-${index}`,
        data: jsonParser(layer),
        ...layerStyle,
      })
    })
  }, [layers])
  // @ts-ignore
  const getTooltip = ({ object }) => {
    return object
      ? {
          text: object?.properties?.name,
          style: {
            backgroundColor: '#fff',
            color: '#000',
          },
        }
      : null
  }
  return (
    <DeckGL
      controller
      initialViewState={{ ...viewState }}
      style={{ width: '100%', height: '100%' }}
      layers={geojsonLayers}
      getTooltip={({ object }) => getTooltip({ object })}
      onViewStateChange={onViewStateChange}
    >
      <Map attributionControl mapStyle="mapbox://styles/mapbox/light-v10" />
      <Controls viewState={viewState} />
    </DeckGL>
  )
}

export default MapPage
