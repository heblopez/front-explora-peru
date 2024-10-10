import { useEffect, useState, ChangeEvent } from 'react'
import { Marker, Polyline, Popup, useMap } from 'react-leaflet'
import L, { LatLngExpression } from 'leaflet'
import '@elfalem/leaflet-curve'

interface MarkerData {
  position: LatLngExpression
  info: string
}

const MarkersRandom = () => {
  const [markerList, setMarkerList] = useState<MarkerData[]>([])
  const map = useMap()
  const [name, setName] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log('Form submitted', { name, file })
  }
  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords
            const userLocation: LatLngExpression = [latitude, longitude]

            setMarkerList(prevMarkerList => [
              { position: userLocation, info: '' },
              ...prevMarkerList
            ])

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
    const onMapClick = (e: L.LeafletMouseEvent) => {
      const newMarker: MarkerData = {
        position: [e.latlng.lat, e.latlng.lng],
        info: ''
      }
      setMarkerList(prevMarkerList => [...prevMarkerList, newMarker])
    }

    map.on('click', onMapClick)

    return () => {
      map.off('click', onMapClick)
    }
  }, [map])

  const handleMarkerInfoChange = (index: number, newInfo: string) => {
    setMarkerList(prevMarkerList =>
      prevMarkerList.map((marker, i) =>
        i === index ? { ...marker, info: newInfo } : marker
      )
    )
  }

  const handleMarkerRightClick = (index: number) => {
    setMarkerList(prevMarkerList =>
      prevMarkerList.filter((_, i) => i !== index)
    )
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
              position={marker.position}
              icon={iconPerson}
              eventHandlers={{
                contextmenu: () => handleMarkerRightClick(index)
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
                        value={name}
                        onChange={e => setName(e.target.value)}
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
          positions={markerList.map(marker => marker.position)}
          color='blue'
        />
      )}
    </>
  )
}

export default MarkersRandom
