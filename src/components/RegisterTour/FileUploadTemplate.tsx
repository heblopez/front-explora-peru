import FileUploadForm from './FileUploadForm'
interface FileUploadTemplateProps {
  onUpdate: (data: File[] | null) => void
}
export default function FileUploadTemplate({
  onUpdate
}: FileUploadTemplateProps) {
  const handleFilesChange = (files: File[]) => {
    onUpdate(files)
  }
  return (
    <div className='flex content-center justify-center'>
      <FileUploadForm onFilesChange={handleFilesChange} />
    </div>
  )
}
