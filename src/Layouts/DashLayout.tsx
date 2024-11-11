import DashNavbar from "@/components/Dashbord/DashNavbar"
import DashSidebar from "@/components/Dashbord/DashSidebar"

type Props = {
  children: React.ReactNode
}

const DashLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col md:flex-row relative overflow-hidden">
      {/* Sidebar with sticky positioning */}
      <div className="flex bg-white shadow-xl shadow-slate-400 w-full  md:w-64 p-2  md:sticky md:top-0 h-auto md:h-screen">
        <DashSidebar />
      </div>

      {/* Main content area */}
      <div className="p-2 md:p-4 w-full md:h-screen overflow-y-auto">
        <DashNavbar />
        {children}
      </div>
    </div>
  )
}

export default DashLayout
