import { useEffect, useState, ChangeEvent, useCallback } from 'react'
import { Marker, Polyline, Popup, useMap } from 'react-leaflet'
import L, { LatLngExpression, LatLngTuple } from 'leaflet'
import '@elfalem/leaflet-curve'
import { debounce } from 'lodash'

interface MarkerData {
  name: string
  description: string
  photoUrl: File | null
  coordinates: [number, number] // Ajustamos aquí para que se llame 'coordinates'
}

interface MarkersRandomProps {
  onMarkersChange: (markers: MarkerData[]) => void
}

const reverseGeocode = async (lat: number, lng: number) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (data && data.address) {
      return data.display_name
    }
  } catch (error) {
    console.error('Error en la geocodificación inversa:', error)
  }

  return `Lugar en [${lat.toFixed(4)}, ${lng.toFixed(4)}]`
}

const MarkersRandom = ({ onMarkersChange }: MarkersRandomProps) => {
  const [markerList, setMarkerList] = useState<MarkerData[]>([])
  const map = useMap()
  const [currentName, setCurrentName] = useState('')
  const [currentFile, setCurrentFile] = useState<File | null>(null)
  const [currentMarkerIndex, setCurrentMarkerIndex] = useState<number | null>(
    null
  )
  const [popupRef, setPopupRef] = useState<L.Popup | null>(null)

  const debouncedOnMarkersChange = useCallback(
    debounce((markers: MarkerData[]) => {
      onMarkersChange(markers)
    }, 300),
    [onMarkersChange]
  )

  useEffect(() => {
    debouncedOnMarkersChange(markerList)
  }, [markerList, debouncedOnMarkersChange])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCurrentFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (currentMarkerIndex !== null) {
      setMarkerList(prevMarkerList =>
        prevMarkerList.map((marker, index) =>
          index === currentMarkerIndex ?
            { ...marker, name: currentName, photoUrl: currentFile }
          : marker
        )
      )
      setCurrentMarkerIndex(null)
      setCurrentName('')
      setCurrentFile(null)

      if (popupRef) {
        popupRef.removeFrom(map)
      }
    }
  }

  useEffect(() => {
    const addDefaultMarker = async (latitude: number, longitude: number) => {
      const placeName = await reverseGeocode(latitude, longitude)

      const userLocation: LatLngExpression = [latitude, longitude]
      const newMarker: MarkerData = {
        coordinates: [userLocation[0], userLocation[1]], // Ajustado a 'coordinates'
        description: '',
        name: placeName,
        photoUrl: null
      }

      setMarkerList(prevMarkerList => [newMarker, ...prevMarkerList])
      map.setView(userLocation, 13)
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          addDefaultMarker(latitude, longitude)
        },
        error => {
          console.error('Error obteniendo la ubicación:', error)
        }
      )
    } else {
      console.error('La geolocalización no es compatible con este navegador.')
    }
  }, [map])

  useEffect(() => {
    const onMapClick = async (e: L.LeafletMouseEvent) => {
      const lat = e.latlng.lat
      const lng = e.latlng.lng

      const placeName = await reverseGeocode(lat, lng)

      const newMarker: MarkerData = {
        coordinates: [lat, lng], // Ajustado a 'coordinates'
        description: '',
        name: placeName,
        photoUrl: null
      }
      setMarkerList(prevMarkerList => [...prevMarkerList, newMarker])
    }

    map.on('click', onMapClick)

    return () => {
      map.off('click', onMapClick)
    }
  }, [map])

  const handleMarkerRightClick = (index: number) => {
    setMarkerList(prevMarkerList =>
      prevMarkerList.filter((_, i) => i !== index)
    )
  }

  const handlePopupOpen = (index: number, popup: L.Popup) => {
    setCurrentMarkerIndex(index)
    setCurrentName(markerList[index].name)
    setCurrentFile(markerList[index].photoUrl)
    setPopupRef(popup)
  }

  return (
    <>
      {markerList.length !== 0 &&
        markerList.map((marker, index) => {
          const iconPerson = new L.Icon({
            iconUrl:
              'https://unpkg.com/leaflet@1.8.0/dist/images/marker-icon.png',
            iconAnchor: [12.5, 41],
            iconSize: new L.Point(25, 41)
          })
          return (
            <Marker
              key={index}
              position={marker.coordinates} // Ajustado a 'coordinates'
              icon={iconPerson}
              eventHandlers={{
                contextmenu: () => handleMarkerRightClick(index),
                popupopen: e => handlePopupOpen(index, e.popup)
              }}
            >
              <Popup>
                <div className='w-[200px] max-w-md mx-auto'>
                  <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                      <label
                        htmlFor='name'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Nombre:
                      </label>
                      <input
                        id='name'
                        type='text'
                        placeholder='Nombre del lugar turístico'
                        value={currentName}
                        onChange={e => setCurrentName(e.target.value)}
                        className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-light focus:border-primary-light'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='image'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Cargar imagen:
                      </label>
                      <input
                        id='image'
                        type='file'
                        accept='image/*'
                        onChange={handleFileChange}
                        className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-light focus:border-primary-light file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-primary-darker hover:file:bg-purple-100'
                      />
                    </div>
                    <button
                      type='submit'
                      className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-darker hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                    >
                      Guardar
                    </button>
                  </form>
                </div>
              </Popup>
            </Marker>
          )
        })}

      {markerList.length > 1 && (
        <Polyline
          positions={markerList.map(marker => marker.coordinates)} // Ajustado a 'coordinates'
          color='blue'
        />
      )}
    </>
  )
}

export default MarkersRandom
