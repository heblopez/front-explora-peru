import React, { useState } from 'react'

interface VideoUploadProps {
  onUpdate: (file: File) => void
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onUpdate }) => {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null)

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedVideo(file)
      onUpdate(file)
    }
  }

  return (
    <div>
      <form>
        <label htmlFor='video-upload'>Subir Video</label>
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
