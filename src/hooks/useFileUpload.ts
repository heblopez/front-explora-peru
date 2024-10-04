import { useState } from 'react'
import { uploadFileToServer } from '../services/api'

const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  const uploadFile = async (file: File) => {
    setIsUploading(true)
    setStatusMessage('')

    try {
      const result = await uploadFileToServer(file)
      setStatusMessage(` ${result}`)
    } catch (error) {
      if (error instanceof Error) {
        setStatusMessage(`Error uploading file: ${error.message}`)
      } else {
        setStatusMessage('An unknown error occurred')
      }
    } finally {
      setIsUploading(false)
    }
  }

  return { isUploading, uploadFile, statusMessage }
}

export default useFileUpload
