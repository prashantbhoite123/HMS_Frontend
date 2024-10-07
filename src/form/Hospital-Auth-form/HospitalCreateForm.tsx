import { zodResolver } from "@hookform/resolvers/zod"

import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import DetailSection from "./DetailSection"
import DoctorSection from "./DoctorSection"
import ImageSection from "./ImageSection"
import { Separator } from "@/components/ui/separator"
import AddressSection from "./AddressSection"
import DepartmentSection from "./DepartmentSection"
import { Button } from "@/components/ui/button"
import ServicesSection from "./ServicesSection"
// import { departments } from "@/config/HospitalData"
import LoadingBtn from "@/components/LoadingBtn"

const doctorSchema = z.object({
  doctorName: z.string().trim().min(1, { message: "Doctor name is required" }),
  education: z.string().trim().min(1, { message: "Education is required" }),
  experienceYears: z
    .string()
    .trim()
    .min(0, { message: "Experience years must be a non-negative number" }),
  specialization: z
    .string()
    .trim()
    .min(1, { message: "Specialization is required" }),
  workingHours: z
    .string()
    .trim()
    .min(1, { message: "Working hours are required" }),
})

const formSchema = z.object({
  hospitalName: z
    .string()
    .trim()
    .min(1, { message: "Hospital name is required" }),
  description: z.string().trim().min(1, { message: "Description is required" }),
  phoneNumber: z
    .string()
    .trim()
    .refine((value) => /^[0-9]{10}$/.test(value), {
      message: "Phone number must be 10 digits",
    }),
  address: z.object({
    city: z.string().trim().min(1, { message: "City is required" }),
    state: z.string().trim().min(1, { message: "State is required" }),
    country: z.string().trim().min(1, { message: "Country is required" }),
  }),
  hospitalType: z
    .string()
    .trim()
    .min(1, { message: "Hospital type is required" }),
  establishedDate: z
    .string()
    .trim()
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "Established date must be a valid date",
    }),
  doctors: z.array(doctorSchema),
  totalBeds: z
    .string()
    .min(1, { message: "Total beds must be a positive integer" }),
  departments: z.array(z.string().trim()).optional(),
  services: z.array(z.string().trim()).optional(),
  pictureUrl: z.string().optional(),
  picture: z.instanceof(File, { message: "image is required" }).optional(),
})

export type hospitalFormData = z.infer<typeof formSchema>

type Props = {
  onSave: (data: FormData) => void
  loading: boolean
}

const HospitalCreateForm = ({ onSave, loading }: Props) => {
  const form = useForm<hospitalFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  const onSubmit = (data: hospitalFormData) => {
    console.log("submit clicked")
    const formData = new FormData()

    // formData.append("address", JSON.stringify(data.address))
    formData.append("address.city", data.address.city)
    formData.append("address.country", data.address.country)
    formData.append("address.state", data.address.state)
    formData.append("hospitalName", data.hospitalName)
    formData.append("description", data.description || "")

    data.departments?.forEach((department, index) => {
      formData.append(`departments[${index}]`, department)
    })

    data.services?.forEach((service, index) => {
      formData.append(`services[${index}]`, service)
    }),
      // data.doctors.forEach((doctor, index) => {
      //   formData.append(`doctors[${index}].doctorName`, doctor.doctorName)
      //   formData.append(`doctors[${index}].education`, doctor.education)
      //   formData.append(
      //     `doctors[${index}].experienceYears`,
      //     doctor.experienceYears.toString()
      //   )
      //   formData.append(`doctors[${index}].specialization`, doctor.specialization)
      //   formData.append(`doctors[${index}].workingHours`, doctor.workingHours)
      // })

      formData.append("doctors", JSON.stringify(data.doctors))
    formData.append("establishedDate", data.establishedDate?.toString() || "")
    formData.append("hospitalType", data.hospitalType)
    formData.append("phoneNumber", data.phoneNumber)
    formData.append("totalBeds", data.totalBeds.toString())
    if (data.picture) {
      formData.append("picture", data.picture)
    }

    // for (let [key, value] of formData.entries()) {
    //   console.log("formadata ==", key, value)
    // }

    onSave(formData)
  }

  const watch = form.watch()
  console.log("Watch : ", watch)

  return (
    <FormProvider {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50  shadow-gray-400 shadow-xl p-10 rounded-lg"
      >
        <DetailSection />
        <Separator />
        <DoctorSection />
        <Separator />
        <DepartmentSection />
        <Separator />
        <AddressSection />
        <Separator />

        <ServicesSection />
        <Separator />
        <ImageSection />

        <Separator />
        {loading ? <LoadingBtn /> : <Button type="submit">Submit</Button>}
      </form>
    </FormProvider>
  )
}

export default HospitalCreateForm
