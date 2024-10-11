import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const SearchBar = () => {
  return (
    <>
      {/* <div className="shadow-lg p-8 rounded-2xl"> */}
        <div className="flex items-center justify-between p-3 border rounded-full  border-gray-500">
          <Search className="size-8 text-green-500" />

          <Input
            autoFocus
            style={{ outline: "none", boxShadow: "none", border: "none" }}
            placeholder="Search hospital"
            className="border-none text-xl font-medium outline-none focus:outline-none focus:ring-0 focus:border-transparent"
          />

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border border-green-500 rounded-full"
            >
              Reset
            </Button>
            <Button className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:bg-white  hover:text-black rounded-full">
              Search
            </Button>
          </div>
        </div>
      {/* </div> */}
    </>
  )
}

export default SearchBar
