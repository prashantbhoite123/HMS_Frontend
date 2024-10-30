import { User } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import {
  MdCancel,
  MdCheckCircleOutline,
  MdDateRange,
  MdDelete,
  MdInfoOutline,
  MdMedicalServices,
  MdPendingActions,
} from "react-icons/md"
import { Button } from "../ui/button"
import { FaEdit } from "react-icons/fa"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"
import LoadingBtn from "../LoadingBtn"
import { useState } from "react"

export type Appointment = {
  _id: string
  patientName: string
  doctorName: string
  date: Date
  reason: string
  status: "Pending" | "Completed" | "Cancelled"
}
type Props = {
  appoinment: Appointment[]
  delApp: (appId: string) => void
  loading: boolean
}

const AppinmetCard = ({ appoinment, delApp, loading }: Props) => {
  const [appoinments, setAppoinment] = useState<Appointment[]>(appoinment)
  const [dialogopen, setDialogopen] = useState(false)
  const handleDelete = async (appId: string) => {
    console.log("click delt", appId)
    delApp(appId)
    setDialogopen(false)
    setAppoinment((prev) => prev.filter((app) => app._id !== appId))
  }

  const handleCancel = () => {
    setDialogopen(false)
  }
  return (
    <div className="flex flex-col p-6 md:p-0 gap-6 w-full md:w-[50vw]">
      {appoinments.map((appoinment: Appointment, index: number) => (
        <Card
          key={index}
          className="bg-white shadow-md shadow-slate-400 rounded-lg hover:shadow-lg transition-shadow duration-200"
        >
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="flex flex-col gap-y-3">
                <div className="flex items-center gap-3 text-slate-700">
                  <User size={20} className="text-blue-600" />
                  <span className="text-[1.1.4rem] font-semibold">
                    Patient Name:
                  </span>
                  <span className="text-sm font-semibold">
                    {appoinment.patientName}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-slate-700">
                  <MdMedicalServices size={20} className="text-green-600" />
                  <span className="text-[1.1.4rem] font-semibold">
                    Doctor Name:
                  </span>
                  <span className="text-sm font-semibold">
                    {appoinment.doctorName}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-slate-700">
                  <MdDateRange size={20} className="text-red-600" />
                  <span className="text-[1.1.4rem] font-semibold">
                    Appointment Date:
                  </span>
                  <span className="font-semibold text-sm">
                    {new Date(appoinment.date).toLocaleDateString("en-GB")}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-slate-700">
                  <MdInfoOutline size="20" />
                  <span className="text-[1.1.4rem] font-semibold">Reason:</span>
                  <span className="font-semibold text-sm">
                    {appoinment.reason}
                  </span>
                </div>

                <div className="flex gap-x-3 text text-slate-700">
                  <span
                    className={`flex items-center gap-3 font-semibold ${
                      appoinment.status === "Pending"
                        ? "text-yellow-500"
                        : appoinment.status === "Completed"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {" "}
                    {appoinment.status === "Pending" ? (
                      <MdPendingActions size="20" />
                    ) : appoinment.status === "Completed" ? (
                      <MdCheckCircleOutline />
                    ) : (
                      <MdCancel size="20" />
                    )}
                  </span>
                  <span className="text-[1.1.4rem] font-semibold">
                    {" "}
                    Status:
                  </span>

                  <span
                    className={`flex items-center gap-3 font-semibold ${
                      appoinment.status === "Pending"
                        ? "text-yellow-500"
                        : appoinment.status === "Completed"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {appoinment.status}
                  </span>
                </div>
              </div>

              <div className="flex justify-between md:justify-end gap-3 mt-3 md:mt-0 ">
                <Button className="flex items-center bg-gradient-to-r from-blue-200 to-blue-300 hover:underline hover:from-blue-100 hover:to-purple-200 text-blue-700 font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 space-x-3">
                  <FaEdit className="text-2xl" />
                  {/* <span>Edit</span> */}
                </Button>

                <Dialog open={dialogopen} onOpenChange={setDialogopen}>
                  <DialogTrigger>
                    <Button
                      variant="link"
                      className="flex items-center bg-gradient-to-r from-red-200 to-red-300 hover:from-red-100 hover:to-red-200 text-red-700 font-medium px-5 py-2 rounded-md shadow-sm hover:shadow-md transition-all transform hover:scale-105 space-x-2"
                    >
                      <MdDelete className="text-2xl" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col gap-y-7 bg-white">
                    <DialogTitle>
                      <h1 className="text-black text-lg font-semibold">
                        Are you sure to delete this appoinment ..?
                      </h1>
                    </DialogTitle>

                    <div className="flex justify-end gap-x-4">
                      <Button
                        variant="outline"
                        className="bg-white text-black "
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      {loading ? (
                        <LoadingBtn />
                      ) : (
                        <Button onClick={() => handleDelete(appoinment._id)}>
                          Delete
                        </Button>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default AppinmetCard
