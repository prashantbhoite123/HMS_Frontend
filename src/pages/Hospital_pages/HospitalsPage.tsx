import {
  useMyHospitalDetail,
  useMySearchHospital,
} from "@/Api/Hospital/useMyHospitalDetails"
import HospitalsCard from "@/components/Hospital/HospitalsCard"
import PaginationSelector from "@/components/Hospital/PaginationSelector"
import SearchBar, { SearchForm } from "@/components/Hospital/SearchBar"
import SearchDetails from "@/components/Hospital/SearchDetails"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Separator } from "@/components/ui/separator"
import { IHospital } from "@/Types/hospital"
import { useState } from "react"
import { Link } from "react-router-dom"

export type SearchState = {
  searchQuery: string
  page: number
  selectedDept: string[]
}

const HospitalsPage = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedDept: [],
  })

  const [isExpanded, setisExpanded] = useState<boolean>(false)
  const { allHospitalData, isLoading } = useMyHospitalDetail()
  const { result, isLoading: searchLoading } = useMySearchHospital(searchState)

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }))
  }

  const handleDeptChange = (newSelectedDept: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedDept: newSelectedDept,
      page: 1,
    }))
  }

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      ...searchFormValues,
    }))
  }

  // Determine which hospital data to display
  const displayHospitalData =
    result && result.data && result.data.length > 0
      ? result.data
      : allHospitalData

  return (
    <div className="container mx-auto p-5">
      {/* Search and Sort Section */}
      <div className="grid grid-cols-1 md:grid-cols-[4fr_1fr] gap-4 items-center mb-6">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={handleSearchSubmit}
        />
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
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6">
        {/* Left Side: Hospital Cards */}
        <div>
          {displayHospitalData?.map((hospital: IHospital, index: number) => (
            <Link to="/detail" key={index}>
              <HospitalsCard
                Hospitals={hospital}
                loading={isLoading || searchLoading}
              />
            </Link>
          ))}
        </div>

        {/* Right Side: Departments (Sector) */}
        <div className=" p-4 rounded">
          <SearchDetails
            isExpanded={isExpanded}
            onExpandedClick={() =>
              setisExpanded((prevIsExpanded) => !prevIsExpanded)
            }
            selectedDept={searchState.selectedDept}
            onChange={handleDeptChange} // Updated function name
          />
        </div>
      </div>

      {/* Bottom: Pagination */}
      <div className="flex justify-center mt-8">
        <PaginationSelector
          page={result?.pagination.page || 1}
          pages={result?.pagination.pages || 1}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}

export default HospitalsPage
