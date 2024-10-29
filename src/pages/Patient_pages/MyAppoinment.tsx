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
    <div className="flex flex-col gap-4 justify-center items-center">
      <div className="flex justify-center items-center ">
        <span className="text-red-500">
          <MdEventNote size="25" />
        </span>
        <h1 className=" p-4  text-2xl text-slate-00 font-semibold ">
          Appoinments
        </h1>
      </div>
      <AppinmetCard
        delApp={delApp}
        loading={delAppLoading}
        appoinment={allAppoinment}
      />
    </div>
  )
}

export default MyAppoinment
