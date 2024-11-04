import { useMysearchAppoinment } from "@/Api/patient/UseManageAppoinment"
import {
  useMyallAppoinment,
  useMydeleteApp,
} from "@/Api/patient/useMyAppoinment"
import PaginationSelector from "@/components/Hospital/PaginationSelector"
import AppinmetCard from "@/components/Patient/AppinmetCard"
import SearchApp, { appSearch } from "@/components/Patient/SearchApp"
import { useState } from "react"
import { MdEventNote } from "react-icons/md"

export type searchState = {
  searchQuery: string
  page: number
}

const MyAppoinment = () => {
  const [searchState, setSearchState] = useState<searchState>({
    searchQuery: "",
    page: 1,
  })
  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }))
  }

  const sethandleSubmit = (data: appSearch) => {
    setSearchState((prevState) => ({
      ...prevState,
      ...data,
    }))
  }
  const { result, isLoading: searchLoding } = useMysearchAppoinment(searchState)
  const { allAppoinment, isLoading } = useMyallAppoinment()
  const { delApp, isLoading: delAppLoading } = useMydeleteApp()
  if (isLoading || searchLoding) {
    return <div className="text-lg text-black font-semibold">Loading...</div>
  }

  console.log("-----------------|>", result)
  console.log("=========|>", allAppoinment)

  const searchAndallApp = result ? result.data : allAppoinment

  return (
    <div className="flex flex-col gap-4 items-center p-4 w-full">
      <div className="flex flex-col mb-7 md:flex-row justify-evenly flex-wrap items-center h-[20vh] md:h-[0vh] p-7 w-full">
        {/* Centered Heading */}
        <div className="flex absolute right-30 justify-center items-center">
          <span className="text-red-500">
            <MdEventNote size="25" />
          </span>
          <h1 className="text-lg md:text-2xl text-slate-700 font-semibold ml-2">
            Appointments
          </h1>
        </div>

        {/* Search Bar on the Right */}
        <div className="flex items-center  mt-20 md:mt-7 ml-0 md:ml-auto ">
          <SearchApp
            onSubmit={sethandleSubmit}
            searchQuery={searchState.searchQuery}
          />
        </div>
      </div>

      {/* Appointments Card */}
      <AppinmetCard
        delApp={delApp}
        loading={delAppLoading}
        appoinment={searchAndallApp}
      />

      <PaginationSelector
        page={result?.pagination?.page || 1}
        pages={result?.pagination?.pages || 1}
        onPageChange={setPage}
      />
    </div>
  )
}

export default MyAppoinment
