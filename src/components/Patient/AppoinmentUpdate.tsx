import { FaEdit } from "react-icons/fa"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
// import { Form } from "../ui/form"
// import { FormProvider } from "react-hook-form"

type Appointment = {
  _id: string
  patientName: string
  doctorName: string
  appointmentDate: Date
  reason: string
  status: "Pending" | "Completed" | "Cancelled"
}
type Props = {
  appoinment: Appointment
}

const AppoinmentUpdate = ({ appoinment }: Props) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="flex items-center bg-gradient-to-r from-blue-200 to-blue-300 hover:underline hover:from-blue-100 hover:to-purple-200 text-blue-700 font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 space-x-3">
            <FaEdit className="text-2xl" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <h2>{appoinment.doctorName}</h2>
        </DialogContent>
      </Dialog>
      {/* <span>Edit</span> */}
    </div>
  )
}

export default AppoinmentUpdate
