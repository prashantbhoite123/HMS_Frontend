import { Controller } from "react-hook-form"
import FormInput from "../Common_Form/FormInput"

const DetailSection = () => {
  // const { control } = useForm()
  const gender = ["Male", "Female", "Other"]
  return (
    <div className=" p-4  rounded-md">
      <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput placeholder="Name" label="Name" type="text" name="name" />
        <FormInput
          placeholder="Date of Birth"
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
        />
        <div>
          <label htmlFor="gender" className="block text-sm font-medium">
            Gender
          </label>
          <Controller
            name="gender"
            render={({ field }) => (
              <select
                {...field}
                className="mt-1 block w-full border rounded p-2"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                {gender.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
        <FormInput placeholder="Age" label="Age" type="number" name="age" />
        <FormInput placeholder="Phone" label="Phone" type="text" name="phone" />
      </div>
    </div>
  )
}

export default DetailSection
