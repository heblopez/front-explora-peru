import axios from 'axios'

export const uploadFileToServer = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  console.log('FormData Content:')
  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1])
  }

  const response = await axios.post(
    'http://localhost:8080/files/upload',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  )

  return response.data
}
export const getUploadedFiles = async () => {
  const response = await axios.get('http://localhost:8080/files')
  console.log(response.data)
  return response.data
}
