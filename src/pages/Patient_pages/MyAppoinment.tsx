import { useMyallAppoinment } from "@/Api/patient/useMyAppoinment"
import AppinmetCard from "@/components/Patient/AppinmetCard"

const MyAppoinment = () => {
  const { allAppoinment, isLoading } = useMyallAppoinment()
  if (isLoading) {
    return <div className="text-2xl">Loading...</div>
  }
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1 className="p-4  text-xl font-semibold">All Appoinments</h1>
      <AppinmetCard appoinment={allAppoinment} />
    </div>
  )
}

export default MyAppoinment
