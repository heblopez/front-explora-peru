import React from 'react'
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'

interface MapWithRouteProps {
  route: Array<[number, number]>
}

const MapWithRoute: React.FC<MapWithRouteProps> = ({ route }) => {
  const centerPosition: [number, number] = route[0]

  return (
    <MapContainer
      center={centerPosition}
      zoom={13}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={route[0]} />

      <Polyline positions={route} color='blue' />
    </MapContainer>
  )
}

export default MapWithRoute
