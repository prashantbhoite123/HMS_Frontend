import { Card, CardContent } from "@/components/ui/card"
import { useUser } from "@/context/userContext"
import { Hospital } from "@/Types/DashTypes"
import { format } from "date-fns"
import { BsRocketTakeoffFill } from "react-icons/bs"
import { MdNotificationAdd } from "react-icons/md"

interface Appointment {
  _id: string
  patientName: string
  petientId: string
  hospitalId: string
  doctorName: string
  appointmentDate: string
  appTime: string
  reason: string
  apptNumber: string
  status: string
  __v: number
  createdAt: string
}

type Props = {
  todayApp: Appointment[] | Hospital[] | Appointment[]
}

const DashRightbar = ({ todayApp }: Props) => {
  const data = todayApp as any
  const { currentUser } = useUser()
  const formatAppointmentTime = (timeSlot?: string): string => {
    if (!timeSlot) return "Time not available"

    const [start, end] = timeSlot.split(" - ")

    if (!start || !end) return "Invalid time format"

    const formatTime = (time: string) => {
      const [hour, minute] = time.split(":")
      const hourNum = parseInt(hour)
      const suffix = hourNum >= 12 ? "pm" : "AM"
      const formattedHour = hourNum % 12 === 0 ? 12 : hourNum % 12
      return `${formattedHour}:${minute} ${suffix}`
    }

    return `${formatTime(start)}`
  }

  return (
    <div className="flex flex-col md:h-auto md:flex-row lg:flex-col md:mt-5 lg:mt-0 h-full gap-y-6 mt-5  md:sticky md:top-36 md:right-5 lg:h-screen static ">
      <div>
        <Card
          borderRadius="none"
          className="w-full md:w-[15rem] max-w-full ml-2"
        >
          <CardContent className="flex flex-col space-x-3 gap-y-2 p-4">
            <h4 className="flex items-center gap-x-2 text-lg font-semibold text-green-500">
              <BsRocketTakeoffFill />
              {currentUser?.role === "Admin"
                ? " Upcoming HOS"
                : currentUser?.role === "hospital"
                ? "Upcoming APPT"
                : "Upcoming APPT"}
            </h4>

            {todayApp?.length === 0 ? (
              <h1 className="font-semibold text-red-500">No Data Found</h1>
            ) : (
              data?.map((appointment: any) => (
                <div
                  key={appointment._id}
                  className="text-sm text-muted-foreground"
                >
                  <div className="flex justify-between font-semibold space-x-3">
                    {currentUser?.role === "Admin" ? (
                      <span> {appointment.hospitalName}</span>
                    ) : currentUser?.role === "hospital" ? (
                      <span>Dr. {appointment.doctorName}</span>
                    ) : (
                      <span>Dr. {appointment.doctorName}</span>
                    )}

                    {currentUser?.role === "Admin" ? (
                      <span className="text-wrap">
                        {appointment?.establishedDate
                          ? format(
                              new Date(appointment.establishedDate),
                              "dd/MM/yyyy"
                            )
                          : "No Date"}
                      </span>
                    ) : currentUser?.role === "hospital" ? (
                      <span className="line-clamp-2">
                        {formatAppointmentTime(appointment?.appTime)}
                      </span>
                    ) : (
                      <span className="line-clamp-2">
                        {formatAppointmentTime(appointment?.appTime)}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Hospital Notifications Card */}
      <div>
        <Card
          borderRadius="none"
          className="w-full md:w-[15rem] max-w-full ml-2"
        >
          <CardContent className="flex flex-col gap-y-2 p-4">
            <h3 className="flex items-center gap-x-2 text-lg font-semibold text-green-500">
              <MdNotificationAdd />
              Hospital Notifications
            </h3>
            <div className="text-sm text-muted-foreground">
              <div className="flex justify-between font-semibold">
                <span className="text-sm">Staff Meeting Tomorrow at 3 PM</span>
                <span className="text-xs text-yellow-600 ml-1">Reminder</span>
              </div>
              <div className="flex justify-between mt-2 font-semibold">
                <span>New COVID-19 Protocols</span>
                <span className="text-xs text-red-600">Urgent</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashRightbar
