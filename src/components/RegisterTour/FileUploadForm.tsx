import React, { useState } from 'react'
import { Upload, X } from 'lucide-react'
import FileInput from './FileInput'
import FileUploadButton from './FileUploadButton'
import useFileUpload from '../../hooks/useFileUpload'
import FileList from './FileList'

interface FileItem {
  name: string
  size: number
  file: File
  progress: number
}

const FileUploadForm: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([])
  const { isUploading, uploadFile, statusMessage } = useFileUpload()

  const [refreshTrigger, setRefreshTrigger] = useState(false)
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(prevFiles => [
      ...prevFiles,
      ...droppedFiles.map(file => ({
        name: file.name,
        size: file.size,
        file,
        progress: 0
      }))
    ])
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setFiles(prevFiles => [
        ...prevFiles,
        ...selectedFiles.map(file => ({
          name: file.name,
          size: file.size,
          file,
          progress: 0
        }))
      ])
    }
  }

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
  }

  const uploadFiles = async () => {
    for (const fileItem of files) {
      await uploadFile(fileItem.file)
    }
    setFiles([])
    setRefreshTrigger(prev => !prev)
  }

  return (
    <div className='flex flex-col md:flex-row md:space-x-4 p-6 rounded-lg shadow-lg'>
      <div className='w-full'>
        <h2 className='text-lg font-semibold mb-4'>File Uploader</h2>
        <div
          className='border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 text-center cursor-pointer'
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
        >
          <Upload className='mx-auto mb-4 text-gray-400' size={48} />
          <p className='text-sm text-gray-500 mb-2'>
            Arrastra y suelta tus archivos aqui
          </p>
          <p className='text-sm text-gray-400 mb-4'>OR</p>
          <label
            htmlFor='fileInput'
            className='w-1/2 px-4 py-2 bg-blue-800 text-white rounded-md cursor-pointer hover:bg-blue-200 transition-colors'
          >
            Buscar Archivos
          </label>
          <FileInput onChange={handleFileChange} />
        </div>
        <div className='space-y-2 mb-4'>
          {files.map((file, index) => (
            <div key={index} className='flex items-center space-x-2'>
              <div className='w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white text-xs'>
                Archivos
              </div>
              <div className='flex-1'>
                <div className='flex justify-between items-center'>
                  <span className='text-sm font-medium'>{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className='text-gray-400 hover:text-gray-600'
                    title='Eliminar archivo'
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <FileUploadButton
          onClick={uploadFiles}
          isUploading={isUploading}
          disabled={files.length === 0}
        />
        <p>{statusMessage}</p>
      </div>
      <FileList refreshTrigger={refreshTrigger} />
    </div>
  )
}

export default FileUploadForm
