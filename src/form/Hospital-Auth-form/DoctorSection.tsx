import { FormDescription } from "@/components/ui/form"
import FormInput from "../Common_Form/FormInput"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  // DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { useFormContext } from "react-hook-form"

const DoctorSection = () => {
  const { watch } = useFormContext()
  const watchs = watch()

  console.log("wahtch", watchs.doctors)
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">Doctor info</h2>
        <FormDescription>Add doctor information</FormDescription>
      </div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Add Doctor</Button>
        </DrawerTrigger>
        <DrawerContent className="p-10">
          <DrawerHeader>
            <DrawerDescription className="font-semibold text-lg text-black">
              Doctor information
            </DrawerDescription>
          </DrawerHeader>
          <div className="grid grid-cols-1 p-5 md:grid-cols-3 gap-5 gap-y-5">
            <FormInput
              label="Doctor Name"
              type="text"
              name="doctors.doctorname"
              placeholder="Enter doctor name"
            />
            <FormInput
              label="ExperienceYears"
              type="number"
              name="doctors.experienceYears"
              placeholder="Enter ExperienceYears name"
            />
            <FormInput
              label="education"
              type="text"
              name="doctors.education"
              placeholder="Enter doctor education"
            />
            <FormInput
              label="specialization"
              type="text"
              name="doctors.specialization"
              placeholder="Enter doctor workingHours"
            />
            <FormInput
              label="workingHours"
              type="number"
              name="doctors.workingHours"
              placeholder="Enter doctor workingHours"
            />
          </div>
          <DrawerFooter>
            <div className="flex justify-between p-2">
              <Button
                variant="outline"
                className="border border-b bg-green-400 text-white"
              >
                Add
              </Button>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="border border-green-400 bg-red-600 text-white"
                >
                  Cancel
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default DoctorSection
