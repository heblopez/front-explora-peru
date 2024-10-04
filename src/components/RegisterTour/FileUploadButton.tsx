import React from 'react'

interface FileUploadButtonProps {
  onClick: () => void
  isUploading: boolean
  disabled: boolean
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  onClick,
  isUploading,
  disabled
}) => (
  <button
    onClick={onClick}
    disabled={isUploading || disabled}
    className='w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed'
  >
    {isUploading ? 'Uploading...' : 'Upload Files'}
  </button>
)

export default FileUploadButton
