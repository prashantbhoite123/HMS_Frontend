import {
  useMyHospitalDetail,
  useMySearchHospital,
} from "@/Api/Hospital/useMyHospitalDetails"
import HospitalsCard from "@/components/Hospital/HospitalsCard"
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

const HospitalsPage = () => {
  const [searchState, setSearchState] = useState<SearchForm>({
    searchQuery: "",
  })
  const { allHospitalData, isLoading } = useMyHospitalDetail()
  const { result, isLoading: searchLoading } = useMySearchHospital(
    searchState.searchQuery
  )

  const handleSearchSubmit = (searchFormvalues: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormvalues.searchQuery,
    }))
  }

  console.log("this is a result ==", result)
  console.log(searchLoading)
  if (!result?.data || !searchState) {
    return <span>No result found</span>
  }
  return (
    <>
      <div className="grid grid-cols md:grid-cols-[4fr_1fr] gap-4 p-5 items-center">
        <SearchBar onSubmit={handleSearchSubmit} />
        <div className="flex justify-center items-center border p-2 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 text-white">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="font-semibold">Sort by : Best match</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4 shadow-md mt-2 outline-none focus:outline-none focus:ring-0 focus:border-transparent">
              <DropdownMenuItem>Sort by services</DropdownMenuItem>
              <Separator />
              <DropdownMenuItem>Hospital type</DropdownMenuItem>
              <Separator />
              <DropdownMenuItem>total beds</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-row md:grid-cols-[4fr_1fr] mt-4">
        <div className="block md:hidden bg-slate-100">
          {allHospitalData?.map((hospitals: IHospital, index: number) => (
            <div className="" key={index}>
              <SearchDetails hospital={hospitals} />
            </div>
          ))}
        </div>
        <Link to="/detail">
          <div className="space-y-7">
            {allHospitalData?.map((hospitals: IHospital, index: number) => (
              <HospitalsCard
                key={index}
                Hospitals={hospitals}
                loading={isLoading}
              />
            ))}
          </div>
        </Link>

        <div className="hidden md:block bg-slate-100">
          {allHospitalData?.map((hospitals: IHospital, index: number) => (
            <div className="" key={index}>
              <SearchDetails hospital={hospitals} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default HospitalsPage
