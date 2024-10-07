import { DollarSign } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

export default function CurrencyDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-white dark:hover:text-primary-light dark:hover:bg-slate-200'
        >
          <DollarSign className='h-4 w-4 mr-1' />
          <span>PEN</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>PEN</DropdownMenuItem>
        <DropdownMenuItem>USD</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
