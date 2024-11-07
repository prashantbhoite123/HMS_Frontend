import DashNavbar from "@/components/Dashbord/DashNavbar"
import DashSidebar from "@/components/Dashbord/DashSidebar"

type Props = {
  children: React.ReactNode
}

const DashLayout = ({ children }: Props) => {
  return (
    <div>
      <div>
        <DashSidebar />
      </div>
      <div>
        <DashNavbar />
              { children}
      </div>
    </div>
  )
}

export default DashLayout
