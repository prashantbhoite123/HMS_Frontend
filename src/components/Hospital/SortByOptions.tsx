import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

const SortByOptions = () => {
  return (
    <>
      <div className="flex justify-center items-center border p-2 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 text-white">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span className="font-semibold">Sort by: Best match</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-4 shadow-md mt-2">
            <DropdownMenuItem>Sort by services</DropdownMenuItem>
            <Separator />
            <DropdownMenuItem>Hospital type</DropdownMenuItem>
            <Separator />
            <DropdownMenuItem>Total beds</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}

export default SortByOptions
