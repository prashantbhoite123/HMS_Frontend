import {
  useMyHospitalDetail,
  useMySearchHospital,
} from "@/Api/Hospital/useMyHospitalDetails"
import HospitalsCard from "@/components/Hospital/HospitalsCard"
import PaginationSelector from "@/components/Hospital/PaginationSelector"
import SearchBar, { SearchForm } from "@/components/Hospital/SearchBar"
import SearchDetails from "@/components/Hospital/SearchDetails"
import SortByOptions from "@/components/Hospital/SortByOptions"
import Loader from "@/components/Loader"

import { IHospital } from "@/Types/hospital"
import { useState } from "react"
import { Link } from "react-router-dom"

export type SearchState = {
  searchQuery: string
  page: number
  selectedDept: string[]
  sortOption: string
}

const HospitalsPage = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedDept: [],
    sortOption: "bestmatch",
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

  const handleSortOption = (sortValues: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption: sortValues,
      page: 1,
    }))
  }

  const displayHospitalData =
    result && result.data && result.data.length > 0
      ? result.data
      : allHospitalData

  if (isLoading) {
    return (
      <div className="text-lg text-black font-semibold">
        <Loader />
      </div>
    )
  }
  return (
    <div className="container mx-auto p-5">
      <div className="grid grid-cols-1 md:grid-cols-[4fr_1fr] gap-4 items-center mb-6">
        <SearchBar
          placeholder="Search Hospital"
          searchQuery={searchState.searchQuery}
          onSubmit={handleSearchSubmit}
        />
        <SortByOptions
          onChange={handleSortOption}
          sortOption={searchState.sortOption}
        />
      </div>

      {/* Main Content */}

      {searchLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6">
          <div>
            {displayHospitalData?.map((hospital: IHospital, index: number) => (
              <Link to={`/detail/${hospital._id}`} key={index}>
                <HospitalsCard
                  Hospitals={hospital}
                  loading={isLoading || searchLoading}
                />
              </Link>
            ))}
          </div>

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
      )}
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
