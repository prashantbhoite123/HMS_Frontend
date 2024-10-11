import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const SearchBar = () => {
  return (
    <>
      <div className="shadow-lg p-10 rounded-2xl">
        {" "}
        <div className="flex items-center justify-between p-3 border rounded-full  border-gray-500">
          <Search className="size-8 text-green-500" />

          <Input
            autoFocus
            style={{ outline: "none", boxShadow: "none", border: "none" }}
            placeholder="Search hospital"
            className="border-none text-lg font-semibold outline-none focus:outline-none focus:ring-0 focus:border-transparent"
          />

          <div className="flex gap-3">
            <Button variant="outline" className="border border-green-500">
              Reset
            </Button>
            <Button className="bg-green-500 hover:bg-white p-2 hover:text-black">
              Search
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchBar
