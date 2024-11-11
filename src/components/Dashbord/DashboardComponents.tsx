import DashCards from "./DashItems/DashCards"
import DashChart from "./DashItems/DashChart"
import DashRecentApp from "./DashItems/DashRecentApp"
import DashRightbar from "./DashItems/DashRightbar"

type ObjectId = string // Assuming ObjectId is serialized as a string in the response

// Define types for the doctors
interface Doctor {
  _id: ObjectId
  doctorName: string
  email: string
  education: string
  experienceYears: number
  specialization: string
  workingHours: string
}

interface Appointment {
  _id: ObjectId
  patientName: string
  petientId: ObjectId
  hospitalId: ObjectId
  doctorName: string
  appointmentDate: string
  appTime: string
  reason: string
  apptNumber: string
  status: string
  __v: number
  createdAt: string
}

// Define the structure of the data
interface DashboardResponse {
  CardData: {
    totalDoctors: number
    totalUser: number
    totalAppoinment: number
    lastMonthAppoinment: number
  }
  latesAppoinments: Appointment[]
  chartData: { count: number; month: string | null }[]
  todayAppointments: Appointment[]
  doctors: Doctor[]
  allAppoinment: Appointment[]
}

type Props = {
  dashData: DashboardResponse
}
const DashboardComponents = ({ dashData }: Props) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col gap-y-6">
        <div className="">
          <DashCards CardData={dashData?.CardData} />
        </div>
        <DashRecentApp latestAppoinment={dashData?.latesAppoinments} />
        <DashChart />
      </div>
      <div className="relative">
        <DashRightbar todayApp={dashData?.todayAppointments} />
      </div>
    </div>
  )
}

export default DashboardComponents
