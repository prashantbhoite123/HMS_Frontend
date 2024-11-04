import {
  useMyallAppoinment,
  useMydeleteApp,
} from "@/Api/patient/useMyAppoinment"
import AppinmetCard from "@/components/Patient/AppinmetCard"
import SearchApp from "@/components/Patient/SearchApp"
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

  const { allAppoinment, isLoading } = useMyallAppoinment()
  const { delApp, isLoading: delAppLoading } = useMydeleteApp()
  if (isLoading) {
    return <div className="text-lg text-black font-semibold">Loading...</div>
  }
  return (
    <div className="flex flex-col gap-4 items-center p-4 w-full">
      <div className="flex flex-col mb-6 md:flex-row justify-evenly items-center h-[20vh] md:h-[0vh] p-7 w-full">
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
        <div className="flex items-center mt-16 md:mt-0 ml-0 md:ml-auto">
          <SearchApp />
        </div>
      </div>

      {/* Appointments Card */}
      <AppinmetCard
        delApp={delApp}
        loading={delAppLoading}
        appoinment={allAppoinment}
      />
    </div>
  )
}

export default MyAppoinment
