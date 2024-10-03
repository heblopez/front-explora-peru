import React from 'react'
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'
import L from 'leaflet'

interface MapWithRouteProps {
  route: Array<[number, number]> // Coordenadas de la ruta (array de [lat, lng])
}

const MapWithRoute: React.FC<MapWithRouteProps> = ({ route }) => {
  const centerPosition: [number, number] = route[0] // Centro inicial del mapa

  return (
    <MapContainer
      center={centerPosition}
      zoom={13}
      style={{ height: '500px', width: '100%' }}
    >
      {/* Capa base del mapa */}
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Marcador inicial */}
      <Marker position={route[0]} />

      {/* Ruta dibujada en el mapa */}
      <Polyline positions={route} color='blue' />
    </MapContainer>
  )
}

export default MapWithRoute
