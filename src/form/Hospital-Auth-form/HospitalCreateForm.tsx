import { zodResolver } from "@hookform/resolvers/zod"

import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import DetailSection from "./DetailSection"
import DoctorSection from "./DoctorSection"
import ImageSection from "./ImageSection"
import { Separator } from "@/components/ui/separator"
import AddressSection from "./AddressSection"
import DepartmentSection from "./DepartmentSection"

const doctorSchema = z.object({
  doctorName: z.string().trim().min(1, { message: "Doctor name is required" }),
  education: z.string().trim().min(1, { message: "Education is required" }),
  experienceYears: z
    .number()
    .int()
    .min(0, { message: "Experience years must be a non-negative integer" }),
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
    .number()
    .int()
    .min(1, { message: "Total beds must be a positive integer" }),
  departments: z.array(z.string().trim()).optional(),
  services: z.array(z.string().trim()).optional(),
  picture: z.string().trim().url({ message: "Picture must be a valid URL" }),
})

export type hospitalFormData = z.infer<typeof formSchema>

const HospitalCreateForm = () => {
  const form = useForm<hospitalFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  const onSubmit = (data: hospitalFormData) => {
    console.log(data)
  }
  console.log("Watch : ", form.watch())
  return (
    <FormProvider {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailSection />
        <Separator />
        <DoctorSection />
        <Separator />
        <DepartmentSection />
        <Separator />
        <AddressSection />
        <Separator />
        <ImageSection />
      </form>
    </FormProvider>
  )
}

export default HospitalCreateForm
