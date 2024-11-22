import { Controller, useForm } from "react-hook-form"
import FormInput from "../Common_Form/FormInput"

const DetailSection = () => {
  const { control } = useForm()
  const gender = ["Male", "Female", "Other"]
  return (
    <div>
      {" "}
      <FormInput placeholder="Name" label="Name" type="text" name="name" />
      <FormInput
        placeholder="Date Of Birth"
        label="Date Of Birth"
        type="date"
        name="dateOfBirth"
      />
      <label htmlFor="doctorName" className="text-sm font-semibold">
        Gender
      </label>
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <select {...field} className="border p-2 rounded">
            <option value="" disabled selected>
              Select a doctor
            </option>
            {gender.map((gender: string) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        )}
      />
      <FormInput placeholder="Age" label="Age" type="number" name="age" />
      <FormInput placeholder="phone" label="Phone" type="number" name="phone" />
    </div>
  )
}

export default DetailSection
