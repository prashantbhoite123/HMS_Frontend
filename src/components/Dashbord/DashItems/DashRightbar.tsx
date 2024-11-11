// import { Card, CardContent } from "@/components/ui/card"
// import { BsRocketTakeoffFill } from "react-icons/bs"
// import { MdNotificationAdd } from "react-icons/md"

// interface Appointment {
//   _id: string
//   patientName: string
//   petientId: string
//   hospitalId: string
//   doctorName: string
//   appointmentDate: string
//   appTime: string
//   reason: string
//   apptNumber: string
//   status: string
//   __v: number
//   createdAt: string
// }

// type Props = {
//   todayApp: Appointment[]
// }
// const DashRightbar = ({ todayApp }: Props) => {
//   const formatAppointmentTime = (timeSlot?: string): string => {
//     if (!timeSlot) return "Time not available"

//     const [start, end] = timeSlot.split(" - ")

//     if (!start || !end) return "Invalid time format"

//     const formatTime = (time: string) => {
//       const [hour, minute] = time.split(":")
//       const hourNum = parseInt(hour)
//       const suffix = hourNum >= 12 ? "PM" : "AM"
//       const formattedHour = hourNum % 12 === 0 ? 12 : hourNum % 12
//       return `${formattedHour}:${minute} ${suffix}`
//     }

//     return `${formatTime(start)}`
//   }

//   return (
//     <div className="flex flex-col h-full gap-y-6 static mt-5 md:mt-0 md:fixed md:top-36 md:right-5 md:h-screen">
//       {/* Upcoming Appointments Card */}
//       <div>
//         <Card>
//           <CardContent className="flex flex-col gap-y-2 w-[20vw] p-4">
//             <h4 className="flex items-center gap-x-2 text-lg font-semibold text-green-500">
//               <BsRocketTakeoffFill />
//               Upcoming APPT
//             </h4>

//             {todayApp.length < 0 ? (
//               <h1>No appoinments</h1>
//             ) : (
//               todayApp?.map((todayApp) => (
//                 <div className="text-sm text-muted-foreground">
//                   <div className="flex justify-between font-semibold">
//                     <span>Dr.{todayApp.doctorName}</span>
//                     <span className="line-clamp-2">
//                       {formatAppointmentTime(todayApp?.appTime)}
//                     </span>
//                   </div>
//                 </div>
//               ))
//             )}
//           </CardContent>
//         </Card>
//       </div>

//       {/* Hospital Notifications Card */}
//       <div>
//         <Card>
//           <CardContent className="flex flex-col gap-y-2 w-full p-4">
//             <h3 className="flex items-center gap-x-2  text-lg font-semibold text-green-500">
//               <MdNotificationAdd />
//               Hospital Notifications
//             </h3>
//             <div className="text-sm text-muted-foreground">
//               <div className="flex justify-between font-semibold">
//                 <span className="text-sm">Staff Meeting Tomorrow at 3 PM</span>
//                 <span className="text-xs text-yellow-600 ml-1">Reminder</span>
//               </div>
//               <div className="flex justify-between mt-2 font-semibold">
//                 <span>New COVID-19 Protocols</span>
//                 <span className="text-xs text-red-600">Urgent</span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// export default DashRightbar

import { Card, CardContent } from "@/components/ui/card"
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
  todayApp: Appointment[]
}

const DashRightbar = ({ todayApp }: Props) => {
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
    <div className="flex flex-col h-full  gap-y-6 mt-5 md:mt-0 md:fixed md:top-36 md:right-5 md:h-screen">
      {/* Upcoming Appointments Card */}
      <div>
        <Card borderRadius="none" className="w-[15rem] max-w-full">
          <CardContent className="flex flex-col gap-y-2 p-4">
            <h4 className="flex items-center gap-x-2 text-lg font-semibold text-green-500">
              <BsRocketTakeoffFill />
              Upcoming APPT
            </h4>

            {todayApp.length === 0 ? (
              <h1 className="font-semibold text-red-500">No appointments</h1>
            ) : (
              todayApp?.map((appointment) => (
                <div
                  key={appointment._id}
                  className="text-sm text-muted-foreground"
                >
                  <div className="flex justify-between font-semibold">
                    <span>Dr. {appointment.doctorName}</span>
                    <span className="line-clamp-2">
                      {formatAppointmentTime(appointment.appTime)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Hospital Notifications Card */}
      <div>
        <Card borderRadius="none" className="w-[15rem] max-w-full">
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
