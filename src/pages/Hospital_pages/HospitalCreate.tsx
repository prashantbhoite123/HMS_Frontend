import {
  usecreateHospital,
  useGetHospital,
  useMyDeleteHospital,
  useUpdateMyHospital,
} from "@/Api/Hospital/useMyCreateHospital"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useUser } from "@/context/userContext"
import HospitalCreateForm from "@/form/Hospital-Auth-form/HospitalCreateForm"
import DoctorSIgnup from "./Doctor/DoctorSIgnup"

const HospitalCreate = () => {
  // const { currentUser } = useUser()

  const { createHospitaldata } = usecreateHospital()
  const { hospital, isLoading, refetch } = useGetHospital()

  const { updateHospital, isLoading: updateLoading } =
    useUpdateMyHospital(refetch)
  const { deleteHos, isLoading: delLoading } = useMyDeleteHospital()

  const isEditing = !!hospital

  return (
    <Tabs defaultValue="manage-hospital">
      <TabsList className="ml-5 md:ml-0">
        <TabsTrigger value="manage-hospital">Manage Hospital</TabsTrigger>
        {hospital && typeof hospital === "object" ? (
          <TabsTrigger value="doctorsignup">Doctors SignUp</TabsTrigger>
        ) : (
          ""
        )}
      </TabsList>

      <TabsContent value="manage-hospital">
        <HospitalCreateForm
          deleteHospital={deleteHos}
          deleteLoding={delLoading}
          hospital={hospital}
          onSave={isEditing ? updateHospital : createHospitaldata}
          loading={isLoading || updateLoading}
        />
      </TabsContent>
      {hospital && typeof hospital === "object" ? (
        <TabsContent
          value="doctorsignup"
          className="space-y-5 bg-gray-50 pg-10 rounded-lg"
        >
          <DoctorSIgnup hospitalId={hospital?._id as string} />
        </TabsContent>
      ) : (
        ""
      )}
    </Tabs>
  )
}

export default HospitalCreate
