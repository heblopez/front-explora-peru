import React, { useState } from 'react'

const VideoUpload: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null)

  // Función para manejar el cambio cuando el usuario selecciona un archivo
  const handleVideoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0] // El archivo puede ser undefined, por eso se usa el operador ?.
    if (file) {
      setSelectedVideo(file)
    }
  }

  // Función para enviar el archivo (enviar el video al backend o procesarlo)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (selectedVideo) {
      // Aquí puedes manejar la subida del video al servidor con fetch o axios
      console.log('Video seleccionado:', selectedVideo)

      // Ejemplo de subida con fetch o axios
      const formData = new FormData()
      formData.append('video', selectedVideo)

      fetch('/upload-video-endpoint', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          console.log('Video subido exitosamente:', data)
        })
        .catch(error => {
          console.error('Error al subir el video:', error)
        })
    } else {
      alert('Por favor selecciona un video primero.')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='video-upload'></label>
        <input
          type='file'
          accept='video/*'
          onChange={handleVideoUpload}
          placeholder='video'
        />
      </form>
      {selectedVideo && (
        <div>
          <h4>Video seleccionado:</h4>
          <p>{selectedVideo.name}</p>
          <video width='400' controls>
            <source
              src={URL.createObjectURL(selectedVideo)}
              type={selectedVideo.type}
            />
            Tu navegador no soporta la etiqueta de video.
          </video>
        </div>
      )}
    </div>
  )
}

export default VideoUpload
