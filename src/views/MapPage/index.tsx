import React from 'react'
import Map from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import DeckGL from '@deck.gl/react/typed'

type Props = {}

// @ts-ignore
mapboxgl.accessToken = MapboxAccessToken

const MapPage = ({}: Props) => {
  return (
    <DeckGL
      controller
      initialViewState={{
        longitude: 116.46,
        latitude: 39.92,
        zoom: 4,
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <Map attributionControl mapStyle="mapbox://styles/mapbox/light-v10" />
    </DeckGL>
  )
}

export default MapPage
