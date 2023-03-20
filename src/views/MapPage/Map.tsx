import React, { useMemo } from 'react'
import Map from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import DeckGL from '@deck.gl/react/typed'
import { GeoJsonLayer } from '@deck.gl/layers/typed'
import { jsonParser } from '@/utils'
import { useAppSelector } from '@/hooks'
import Controls from './Controls'

type Props = {
  layers: string[]
}

// @ts-ignore
mapboxgl.accessToken = MapboxAccessToken

const MapPage = ({ layers }: Props) => {
  const viewState = useAppSelector((state) => state.deckglViewStateReducer.deckglViewState)
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
    >
      <Map mapStyle="mapbox://styles/mapbox/light-v10" />
      <Controls viewState={viewState} />
    </DeckGL>
  )
}

export default React.memo(MapPage)
