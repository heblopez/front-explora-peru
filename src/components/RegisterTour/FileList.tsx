import React, { useEffect, useState } from 'react'
import { getUploadedFiles } from '../../services/api'

// Definir el tipo para el archivo
interface FileItem {
  id: string
  name: string
}
interface FileListProps {
  refreshTrigger: boolean
}
const FileList: React.FC<FileListProps> = ({ refreshTrigger }) => {
  const [uploadedFiles, setUploadedFiles] = useState<FileItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchFiles = async () => {
      const uploadedFilesList = await getUploadedFiles()
      setUploadedFiles(uploadedFilesList)
      setLoading(false)
    }

    fetchFiles()
  }, [refreshTrigger])

  return (
    <div className='p-4 w-full'>
      <h2 className='text-lg font-semibold mb-4'>
        Lista de archivos cargados:{' '}
      </h2>
      {loading ?
        <p>Loading files...</p>
      : uploadedFiles.length > 0 ?
        <div className='container mx-auto py-10'>
          <table className='min-w-full bg-white'>
            <thead>
              <tr className='bg-blue-400 border-b'>
                <th className='text-left py-3 px-4 font-semibold text-sm'>
                  ID
                </th>
                <th className='text-left py-3 px-4 font-semibold text-sm'>
                  Name
                </th>
              </tr>
            </thead>
            <tbody className='text-gray-700'>
              {uploadedFiles.map((file, index) => (
                <tr
                  key={file.id}
                  className={index % 2 === 0 ? 'bg-gray-50' : ''}
                >
                  <td className='py-3 px-4'>{file.id}</td>
                  <td className='py-3 px-4'>{file.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      : <p>No files uploaded yet.</p>}
    </div>
  )
}

export default FileList
