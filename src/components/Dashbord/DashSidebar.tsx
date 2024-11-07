import { Link } from "react-router-dom"

const DashSidebar = () => {
  return (
    <div>
      DashSidebar
      <Link to="/dashboard?tab=dashdoctors">Doctors</Link>
      <Link to="/dashboard?tab=dashappoinment">Appoinment</Link>
    </div>
  )
}

export default DashSidebar
