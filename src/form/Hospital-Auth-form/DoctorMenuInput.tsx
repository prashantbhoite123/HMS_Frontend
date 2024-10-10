import { Separator } from "@/components/ui/separator"
import FormInput from "../Common_Form/FormInput"
import { Button } from "@/components/ui/button"

type Props = {
  index: number
  removeMenuItem: () => void
}

const DoctorMenuInput = ({ index, removeMenuItem }: Props) => {
  
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <FormInput
          name={`doctors.${index}.doctorName`}
          label="Doctor Name"
          type="text"
          placeholder="Enter doctor name"
        />
        <FormInput
          name={`doctors.${index}.education`}
          label="Education"
          type="education"
          placeholder="Enter doctor education "
        />
        <FormInput
          name={`doctors.${index}.experienceYears`}
          label="ExperienceYears"
          type="number"
          placeholder="Enter doctor experienceYears "
        />
        <FormInput
          name={`doctors.${index}.specialization`}
          label="specialization"
          type="text"
          placeholder="Enter doctor specialization "
        />
        <FormInput
          name={`doctors.${index}.workingHours`}
          label="workingHours"
          type="number"
          placeholder="Enter doctor workingHours"
        />
        <Button
          type="button"
          onClick={removeMenuItem}
          className="bg-red-500 max-h-fit mt-2 md:mt-8 px-2 w-[16vw] md:w-[10vw]"
        >
          Remove
        </Button>
      </div>
      <div className="mt-5">
        <Separator />
      </div>
    </div>
  )
}

export default DoctorMenuInput
