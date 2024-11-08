import { Card, CardContent } from "@/components/ui/card"
import { FaUserMd } from "react-icons/fa"
import { MdEventNote, MdSupervisedUserCircle } from "react-icons/md"

function DashCards() {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="w-full md:w-[20vw]">
        <Card>
          <CardContent className="flex flex-col gap-y-2 p-4 shadow-xl rounded-none">
            <div className="flex items-center gap-x-2 text-green-500">
              <MdSupervisedUserCircle size={24} />
              <span className="text-[1.2rem] font-semibold ">Total Users</span>
            </div>
            <div className="ml-7 text-lg font-semibold">10.264</div>
            <div className="ml-7 font-semibold text-sm">
              <span className="text-green-500 ">12%</span> More than previous
              week
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full md:w-[20vw]">
        <Card>
          <CardContent className="flex flex-col gap-y-2 p-4 shadow-xl rounded-none">
            <div className="flex items-center gap-x-2 text-green-500">
              <MdEventNote size={24} />
              <span className="text-[1.2rem] font-semibold ">
                Total Appoinment
              </span>
            </div>
            <div className="ml-7 text-lg font-semibold">10.264</div>
            <div className="ml-7 font-semibold text-sm">
              <span className="text-green-500 ">12%</span> More than previous
              week
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full md:w-[20vw]">
        <Card>
          <CardContent className="flex flex-col gap-y-2 p-4 shadow-xl rounded-none">
            <div className="flex items-center gap-x-2 text-green-500">
              <FaUserMd size={24} />

              <span className="text-[1.2rem] font-semibold ">
                Total Doctors
              </span>
            </div>
            <div className="ml-7 text-lg font-semibold">10.264</div>
            <div className="ml-7 font-semibold text-sm">
              <span className="text-green-500 ">12%</span> More than previous
              week
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashCards
