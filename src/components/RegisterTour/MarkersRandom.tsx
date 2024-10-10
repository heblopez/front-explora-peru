import { useEffect, useState } from 'react'
import { Marker, Polyline, useMap } from 'react-leaflet'
import L, { LatLngExpression } from 'leaflet'
import '@elfalem/leaflet-curve'

const MarkersRandom = () => {
  const [markerList, setMarkerList] = useState<LatLngExpression[]>([])
  const map = useMap()

  // Obtener la ubicación actual del usuario al montar el componente
  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords
            const userLocation: LatLngExpression = [latitude, longitude]
            // Establecer la ubicación actual del usuario como el primer marcador
            setMarkerList(prevMarkerList => [userLocation, ...prevMarkerList])
            // Mover el mapa a la ubicación del usuario
            map.setView(userLocation, map.getZoom())
          },
          error => {
            console.error('Error obteniendo la ubicación:', error)
          }
        )
      } else {
        console.error('La geolocalización no es compatible con este navegador.')
      }
    }

    getCurrentLocation()
  }, [map])

  useEffect(() => {
    // Agregar el evento de clic en el mapa
    const onMapClick = (e: L.LeafletMouseEvent) => {
      const newMarker: LatLngExpression = [e.latlng.lat, e.latlng.lng]
      setMarkerList(prevMarkerList => [...prevMarkerList, newMarker])
    }

    // Agrega el listener del clic en el mapa
    map.on('click', onMapClick)

    // Limpieza para eliminar el listener cuando el componente se desmonte
    return () => {
      map.off('click', onMapClick)
    }
  }, [map])

  // Función para manejar el clic en un marcador y eliminarlo
  const handleMarkerClick = (index: number) => {
    setMarkerList(prevMarkerList =>
      prevMarkerList.filter((_, i) => i !== index)
    )
  }

  return (
    <>
      {markerList.length !== 0 &&
        markerList.map((position, index) => {
          const iconPerson = new L.Icon({
            iconUrl:
              'https://unpkg.com/leaflet@1.8.0/dist/images/marker-icon.png',
            iconAnchor: [12.5, 41],
            iconSize: new L.Point(25, 41)
          })
          return (
            <Marker
              key={index}
              position={position}
              icon={iconPerson}
              eventHandlers={{
                click: () => handleMarkerClick(index)
              }}
            />
          )
        })}

      {/* Dibujar la ruta con Polyline si hay más de un marcador */}
      {markerList.length > 1 && (
        <Polyline positions={markerList} color='blue' />
      )}
    </>
  )
}

export default MarkersRandom
