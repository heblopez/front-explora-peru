import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import '@elfalem/leaflet-curve'
import MarkersRandom from './MarkersRandom'

interface MarkerData {
  name: string
  description: string
  photoUrl: File | null
  coordinates: [number, number]
}

interface MapWithRouteProps {
  onUpdate: (data: MarkerData[]) => void
}

export default function MapWithRoute({ onUpdate }: MapWithRouteProps) {
  const position: LatLngExpression = [35.376307, 5.918474]
  const zoom = 4.75

  const handleMarkersUpdate = (markers: MarkerData[]) => {
    onUpdate(markers)
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
