import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { IQueryForm } from '@/pages/SearchTours'

interface RegionsSelectProps {
  queryForm: IQueryForm
  handleRegionChange: (value: string) => void
}

export default function RegionsSelect({
  queryForm,
  handleRegionChange
}: RegionsSelectProps) {
  return (
    <>
      <label className='text-sm font-medium text-gray-700 dark:text-inherit'>
        Por región:
      </label>
      <Select
        value={queryForm.region}
        onValueChange={value => handleRegionChange(value)}
      >
        <SelectTrigger className='mt-1 dark:border-primary-lighter'>
          <SelectValue placeholder='Seleccionar región' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Todas las regiones</SelectItem>
          <SelectItem value='Amazonas'>Amazonas</SelectItem>
          <SelectItem value='Ancash'>Ancash</SelectItem>
          <SelectItem value='Apurímac'>Apurímac</SelectItem>
          <SelectItem value='Arequipa'>Arequipa</SelectItem>
          <SelectItem value='Ayacucho'>Ayacucho</SelectItem>
          <SelectItem value='Cajamarca'>Cajamarca</SelectItem>
          <SelectItem value='Callao'>Callao</SelectItem>
          <SelectItem value='Cusco'>Cusco</SelectItem>
          <SelectItem value='Huancavelica'>Huancavelica</SelectItem>
          <SelectItem value='Huánuco'>Huánuco</SelectItem>
          <SelectItem value='Ica'>Ica</SelectItem>
          <SelectItem value='Junín'>Junín</SelectItem>
          <SelectItem value='La Libertad'>La Libertad</SelectItem>
          <SelectItem value='Lambayeque'>Lambayeque</SelectItem>
          <SelectItem value='Lima'>Lima</SelectItem>
          <SelectItem value='Loreto'>Loreto</SelectItem>
          <SelectItem value='Madre de Dios'>Madre de Dios</SelectItem>
          <SelectItem value='Moquegua'>Moquegua</SelectItem>
          <SelectItem value='Pasco'>Pasco</SelectItem>
          <SelectItem value='Piura'>Piura</SelectItem>
          <SelectItem value='Puno'>Puno</SelectItem>
          <SelectItem value='San Martín'>San Martín</SelectItem>
          <SelectItem value='Tacna'>Tacna</SelectItem>
          <SelectItem value='Tumbes'>Tumbes</SelectItem>
          <SelectItem value='Ucayali'>Ucayali</SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}
