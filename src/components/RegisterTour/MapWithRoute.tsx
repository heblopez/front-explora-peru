import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'

import { LatLngExpression } from 'leaflet'
import '@elfalem/leaflet-curve'
import MarkersRandom from './MarkersRandom'
interface MapWithRouteProps {
  onUpdate: (data: LatLngExpression[]) => void
}
export default function MapWithRoute({ onUpdate }: MapWithRouteProps) {
  const position: LatLngExpression = [35.376307, 5.918474]
  const zoom = 4.75
  const handleMarkersUpdate = (markers: LatLngExpression[]) => {
    onUpdate(markers) // Llama a `onUpdate` para actualizar el paso en el componente `Stepper`
  }
  return (
    <MapContainer
      center={position}
      zoom={zoom}
      maxZoom={20}
      scrollWheelZoom={false}
      style={{ height: '90vh', width: '90vw' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <MarkersRandom onMarkersChange={handleMarkersUpdate} />
    </MapContainer>
  )
}
