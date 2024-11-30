import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { Textarea } from "../ui/textarea"
import LoadingBtn from "../LoadingBtn"
import { FaCalendar } from "react-icons/fa"
import { BsHeartPulseFill } from "react-icons/bs"
import { format } from "date-fns"

type Props = {
  appData: {
    doctorName: string
    appDate: Date
    appTime: string
    reson: string
  }
}
function DashScheduleAppPop({ appData }: Props) {
  const formatAppointmentTime = (timeSlot?: string): string => {
    if (!timeSlot) return "Time not available"

    const [start, end] = timeSlot.split(" - ")

    if (!start || !end) return "Invalid time format"

    const formatTime = (time: string) => {
      const [hour, minute] = time.split(":")
      const hourNum = parseInt(hour)
      const suffix = hourNum >= 12 ? "pm" : "am"
      const formattedHour = hourNum % 12 === 0 ? 12 : hourNum % 12
      return `${formattedHour}:${minute} ${suffix}`
    }

    return `${formatTime(start)}`
  }
  const [open, setOpen] = useState(false)
  const [loading, setloading] = useState(false)
  const handleSubmit = () => {
    setloading(false)
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button
            variant="outline"
            className="text-blue-500 font-bold shadow-xl hover:text-blue-500 hover:bg-white rounded-lg transition hover:scale-110 shadow-slate-300"
          >
            Schedule
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-100 text-black font-semibold ">
          <div className="flex items-center text-xl sm:text-2xl font-bold text-white">
            <span className="flex justify-center items-center gap-x-3 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-md text-transparent bg-clip-text">
              <span>
                <BsHeartPulseFill className="text-pink-600" size="30" />
              </span>

              <span>CarePlusX</span>
            </span>
          </div>
          <div className="">
            <h1 className="text-xl bg-gradient-to-r font-semibold from-indigo-600 to-pink-600 text-transparent bg-clip-text">
              Schedule Appoinment
            </h1>
            <h6 className="text-sm text-slate-600">
              Please Check the following details to schedule appoinment
            </h6>
          </div>
          <div className="flex flex-col p-2 gap-y-2">
            <label className="text-slate-700">Doctor</label>
            <div className="flex  items-center border px-2 rounded-md border-slate-400">
              <img
                src="https://imgcdn.stablediffusionweb.com/2024/3/30/68e909a4-34e6-403d-97fc-72cee0558af0.jpg"
                alt=""
                className="w-8 h-8 rounded-full"
              />
              <input
                defaultValue={appData?.doctorName}
                readOnly
                className="p-2 bg-gray-100 border outline-none text-slate-700 border-none px-4 rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col p-2 gap-y-2">
            <label className="text-slate-700">Excepted appoinment date</label>
            <div className="flex  items-center border px-2 rounded-md border-slate-400">
              <FaCalendar />
              <input
                defaultValue={`${format(
                  new Date(appData?.appDate),
                  "dd/MM/yyyy"
                )}   ${formatAppointmentTime(appData?.appTime)}`}
                readOnly
                className="p-2 bg-gray-100 w-full border outline-none text-slate-700 border-none px-4 rounded-md"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-slate-700">Appoinment Reson</label>
            <Textarea
              readOnly
              defaultValue={appData?.reson}
              placeholder="fill the reason"
              className="text-slate-700 border mt-2 border-slate-400 outline-none"
            />
          </div>
          {loading ? (
            <LoadingBtn />
          ) : (
            <Button
              className="bg-gradient-to-r from-indigo-600 to-pink-600 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform "
              onClick={handleSubmit}
            >
              Schedule Appoinment
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DashScheduleAppPop
