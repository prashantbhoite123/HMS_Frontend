import { Hospital, User } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { MdMedicalServices } from "react-icons/md"
import { Button } from "../ui/button"

export type Appointment = {
  patientName: string
  doctorName: string
  date: Date
  reason: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
}
type Props = {
  appoinment: Appointment[]
}

const AppinmetCard = ({ appoinment }: Props) => {
  return (
    <div className="flex flex-col p-6 md:p-0 gap-6 w-full md:w-[50vw]">
      {appoinment.map((appoinment: Appointment, index: number) => (
        <Card
          key={index}
          className="bg-white shadow-md shadow-slate-200 rounded-lg hover:shadow-lg transition-shadow duration-200"
        >
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Appointment Details */}
              <div className="flex flex-col gap-y-3">
                <div className="flex items-center gap-3 text-slate-700">
                  <User size={20} className="text-blue-600" />
                  <span className="font-semibold">Patient Name:</span>
                  <span>{appoinment.patientName}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-700">
                  <MdMedicalServices size={20} className="text-green-600" />
                  <span className="font-semibold">Doctor Name:</span>
                  <span>{appoinment.doctorName}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-700">
                  <Hospital size={20} className="text-red-600" />
                  <span className="font-semibold">Appointment Date:</span>
                  <span>
                    {new Date(appoinment.date).toLocaleDateString("en-GB")}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-slate-700">
                  <span className="font-semibold">Reason:</span>
                  <span>{appoinment.reason}</span>
                </div>

                <div
                  className={`flex items-center gap-3 font-semibold ${getStatusColor(
                    appoinment.status
                  )}`}
                >
                  Status:{" "}
                  {appoinment.status.charAt(0).toUpperCase() +
                    appoinment.status.slice(1)}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-all">
                  Edit
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-md transition-all"
                >
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Helper function to set status color
function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "text-yellow-500"
    case "confirmed":
      return "text-blue-500"
    case "completed":
      return "text-green-500"
    case "cancelled":
      return "text-red-500"
    default:
      return "text-slate-700"
  }
}

export default AppinmetCard
