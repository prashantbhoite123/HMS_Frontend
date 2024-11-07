import DashNavbar from "@/components/Dashbord/DashNavbar"
import DashSidebar from "@/components/Dashbord/DashSidebar"

type Props = {
  children: React.ReactNode
}

const DashLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex bg-slate-200 w-full md:w-64 p-2">
        <DashSidebar />
      </div>
      <div className="p-4 w-full h-screen">
        <DashNavbar />
        {children}
      </div>
    </div>
  )
}

export default DashLayout
