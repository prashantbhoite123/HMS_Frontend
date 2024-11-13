import AdminSigninForm from "@/form/Common_Form/AdminSigninForm"

const handleSign = () => {
  console.log("click");
}
const AdminSignin = () => {
  return (
    <div className="flex justify-center items-center gap-5">
      <AdminSigninForm signInAdmin={handleSign} isLoading={false} />
    </div>
  )
}

export default AdminSignin
