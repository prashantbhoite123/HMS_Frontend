import { useMyAdminApi } from "@/Api/common_Api/useAdminApi"
import AdminSigninForm from "@/form/Common_Form/AdminSigninForm"

const AdminSignin = () => {
  const { adminData, isLoading } = useMyAdminApi()
  return (
    <div className="flex justify-center items-center gap-5">
      <AdminSigninForm signInAdmin={adminData} isLoading={isLoading} />
    </div>
  )
}

export default AdminSignin
