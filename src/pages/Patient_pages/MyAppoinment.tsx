import {
  useMyallAppoinment,
  useMydeleteApp,
} from "@/Api/patient/useMyAppoinment"
import AppinmetCard from "@/components/Patient/AppinmetCard"
import { MdEventNote } from "react-icons/md"

const MyAppoinment = () => {
  const { allAppoinment, isLoading } = useMyallAppoinment()
  const { delApp, isLoading: delAppLoading } = useMydeleteApp()
  if (isLoading) {
    return <div className="text-lg text-black font-semibold">Loading...</div>
  }
  return (
    <div className="flex flex-col gap-4 items-center p-4 w-full">
      <div className="flex flex-col   md:flex-row justify-evenly items-center h-[15vh] md:h-[0vh] p-4 w-full relative">
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
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded-md border border-gray-300 w-full md:w-[25vw]"
          />
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
