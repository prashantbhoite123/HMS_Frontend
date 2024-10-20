import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "../ui/separator"

type Props = {
  onChange: (value: string) => void
  sortOption: string
}

const SORT_OPTIONS = [
  {
    lable: "best match",
    value: "bestmatch",
  },
  {
    lable: "total beds",
    value: "totalBeds",
  },
  {
    lable: "Established Date",
    value: "establishedDate",
  },
]

const SortByOptions = ({ onChange, sortOption }: Props) => {
  return (
    <>
      <div className="flex justify-center items-center border p-2 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 text-white">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span className="font-semibold">Sort by: {sortOption}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-4 shadow-md mt-2">
            {SORT_OPTIONS.map((options, index) => {
              return (
                <div key={index}>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => onChange(options.value)}
                  >
                    {options.lable}
                  </DropdownMenuItem>
                  <Separator />
                </div>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}

export default SortByOptions
