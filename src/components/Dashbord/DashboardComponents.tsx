// import { DashboardResponse, ResponseType } from "@/Types/DashTypes"
// import DashCards from "./DashItems/DashCards"
// import DashChart from "./DashItems/DashChart"
// import DashRecentApp from "./DashItems/DashRecentApp"
// import DashRightbar from "./DashItems/DashRightbar"
// import { useUser } from "@/context/userContext"

// type Props = {
//   dashData: DashboardResponse | ResponseType
// }

// const DashboardComponents = ({ dashData }: Props) => {
//   const { currentUser } = useUser()

//   const data = dashData as any
//   const isAdmin = currentUser?.role === "Admin"
//   const isHospital = currentUser?.role === "hospital"

//   return (
//     <div className="flex flex-col md:flex-row">
//       <div className="flex flex-col gap-y-6">
//         <DashCards
//           CardData={
//             isAdmin ? data.dashCard : isHospital ? data.CardData : undefined
//           }
//         />
//         <DashRecentApp
//           latestAppoinment={
//             isAdmin
//               ? data?.latestPendingHospitals
//               : isHospital
//               ? data?.latestAppoinment
//               : undefined
//           }
//         />
//         <DashChart chartData={data?.chartData} />
//       </div>
//       <div className="relative">
//         <DashRightbar
//           todayApp={
//             isAdmin
//               ? data?.todaysPendingHospitals
//               : isHospital
//               ? data?.todayAppointments
//               : undefined
//           }
//         />
//       </div>
//     </div>
//   )
// }

// export default DashboardComponents

import { DashboardResponse, ResponseType } from "@/Types/DashTypes"
import DashCards from "./DashItems/DashCards"
import DashChart from "./DashItems/DashChart"
import DashRecentApp from "./DashItems/DashRecentApp"
import DashRightbar from "./DashItems/DashRightbar"
import { useUser } from "@/context/userContext"
import DashRecentPendingHos from "./DashItems/DashRecentPendingHos"

type Props = {
  dashData: DashboardResponse | ResponseType | any
}

const DashboardComponents = ({ dashData }: Props) => {
  const { currentUser } = useUser()

  const isAdmin = currentUser?.role === "Admin"
  const isHospital = currentUser?.role === "hospital"

  // Use type narrowing to determine the data type
  const data = dashData as any

  console.log("this is dashData==>", data)

  if (!data) return <div>Loading...</div> // Handle case where data is not available

  return (
    <div className="flex flex-col md:flex-col lg:flex-row ">
      <div className="flex flex-col gap-y-6">
        <DashCards
          CardData={
            isAdmin ? data.dashCard : isHospital ? data.CardData : undefined
          }
        />

        {currentUser?.role === "Admin" ? (
          <DashRecentPendingHos recentPenHos={data?.latestPendingHospitals} />
        ) : currentUser?.role === "hospital" ? (
          <DashRecentApp latestAppoinment={data?.latestAppointments} />
        ) : undefined}

        <DashChart chartData={data?.chartData} />
      </div>
      <div className="relative">
        <DashRightbar
          todayApp={
            isAdmin
              ? data?.todaysPendingHospitals
              : isHospital
              ? data?.todayAppointments
              : undefined
          }
        />
      </div>
    </div>
  )
}

export default DashboardComponents
