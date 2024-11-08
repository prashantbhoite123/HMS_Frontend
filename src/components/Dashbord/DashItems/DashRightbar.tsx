import { Card, CardContent } from "@/components/ui/card"
import { BsRocketTakeoffFill } from "react-icons/bs"
import { MdNotificationAdd } from "react-icons/md"

const DashRightbar = () => {
  return (
    <div className="flex flex-col h-full gap-y-6 static mt-5 md:mt-0 md:fixed md:top-36 md:h-screen">
      {/* Upcoming Appointments Card */}
      <div>
        <Card>
          <CardContent className="flex flex-col gap-y-2 w-full p-4">
            <h4 className="flex items-center gap-x-2 text-lg font-semibold text-green-500">
              <BsRocketTakeoffFill />
              Upcoming APPT
            </h4>
            <div className="text-sm text-muted-foreground">
              <div className="flex justify-between font-semibold">
                <span>Dr. Smith (Cardiology)</span>
                <span>12:30 PM</span>
              </div>
              <div className="flex justify-between mt-2 font-semibold">
                <span>Dr. John (Orthopedics)</span>
                <span>2:00 PM</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hospital Notifications Card */}
      <div>
        <Card>
          <CardContent className="flex flex-col gap-y-2 w-full p-4">
            <h3 className="flex items-center gap-x-2  text-lg font-semibold text-green-500">
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
