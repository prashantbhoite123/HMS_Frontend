import { Card, CardContent } from "@/components/ui/card"
import { MdSupervisedUserCircle } from "react-icons/md"

function DashCards() {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="w-full md:w-[20vw]">
        <Card>
          <CardContent className="p-2">
            <div className="flex gap-x-2">
              <MdSupervisedUserCircle size={24} />
              <span>Total Users</span>
            </div>
            <div className="spa">10.264</div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full md:w-[20vw]">
        <Card>
          <CardContent>
            <MdSupervisedUserCircle size={24} />
          </CardContent>
        </Card>
      </div>
      <div className="w-full md:w-[20vw]">
        <Card>
          <CardContent>
            <MdSupervisedUserCircle size={24} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashCards
