import React from 'react'

interface FileInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => (
  <>
    {' '}
    <label htmlFor='fileInput' className='sr-only'>
      .
    </label>
    <input
      id='fileInput'
      type='file'
      multiple
      className='hidden'
      onChange={onChange}
    />
  </>
)

export default FileInput
