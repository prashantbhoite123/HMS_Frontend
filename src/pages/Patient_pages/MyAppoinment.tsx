import { useMysearchAppoinment } from "@/Api/patient/UseManageAppoinment"
import {
  useMyallAppoinment,
  useMydeleteApp,
  useUpdateApp,
} from "@/Api/patient/useMyAppoinment"
import PaginationSelector from "@/components/Hospital/PaginationSelector"
import Loader from "@/components/Loader"
import AppinmetCard from "@/components/Patient/AppinmetCard"
import { AppointmentForm } from "@/components/Patient/AppoinmentUpdate"
import SearchApp, { appSearch } from "@/components/Patient/SearchApp"
import { useEffect, useState } from "react"
import { MdEventNote } from "react-icons/md"

export type searchState = {
  searchQuery: string
  page: number
}

const MyAppoinment = () => {
  const [appId, setAppId] = useState("")
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
  const { allAppoinment, isLoading, refetch } = useMyallAppoinment()

  const { delApp, isLoading: delAppLoading } = useMydeleteApp()
  const { updatedApp, isLoading: updatedappLoading } = useUpdateApp(
    appId,
    refetch
  )
  console.log(updatedApp)
  console.log("Updated app loading:", updatedappLoading)
  console.log("All appointments:", allAppoinment)

  useEffect(() => {
    if (!updatedappLoading) {
      refetch()
    }
  }, [updatedApp])

  const handleUpdaredApp = (
    appId: string,
    updatedAppoinment: AppointmentForm
  ) => {
    setAppId(appId)
    updatedApp(updatedAppoinment)
  }

  if (searchLoding || isLoading) {
    return (
      <div>
        <Loader />
      </div>
    )
  }

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
        handleUpdateApp={handleUpdaredApp}
        isLoading={updatedappLoading}
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
