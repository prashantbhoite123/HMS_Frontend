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

import LoadingBtn from "@/components/LoadingBtn"
import { IHospital } from "@/Types/hospital"
import { useEffect } from "react"

const doctorSchema = z.object({
  doctorName: z.string().trim().min(1, { message: "Doctor name is required" }),
  education: z.string().trim().min(1, { message: "Education is required" }),
  experienceYears: z
    .string()
    .trim()
    .refine((value) => /^[0-9]{3}$/.test(value), {
      message: "Working hours must be exactly 3 digits.",
    })
    .refine(
      (value) => {
        const expYear = parseInt(value)
        return expYear > 100 // Change this logic based on your requirement
      },
      {
        message: "Mela nahi ka bhaday ajun",
      }
    ),
  specialization: z
    .string()
    .trim()
    .min(1, { message: "Specialization is required" }),
  workingHours: z
    .string()
    .trim()
    .refine((value) => /^[0-9]{2}$/.test(value), {
      message: "Working hours must be exactly 2 digits.",
    })
    .refine(
      (value) => {
        const hour = parseInt(value, 10)
        return hour >= 0 && hour <= 24 // Ensure hour is between 0 and 24
      },
      {
        message: "Working hours must be between 0 and 24.",
      }
    ),
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
  deleteHospital: () => void
  deleteLoding: boolean
  hospital?: IHospital
  onSave: (data: FormData) => void
  loading: boolean
}

const HospitalCreateForm = ({
  deleteHospital,
  deleteLoding,
  onSave,
  loading,
  hospital,
}: Props) => {
  const form = useForm<hospitalFormData>({
    resolver: zodResolver(formSchema),
  })

  // console.log("taksdas==", hospital?.establishedDate)

  useEffect(() => {
    if (!hospital) {
      return
    }

    const formatedDate = hospital.establishedDate
      ? (() => {
          const date = new Date(hospital.establishedDate)
          const day = String(date.getDate()).padStart(2, "0")
          const month = String(date.getMonth() + 1).padStart(2, "0")
          const year = date.getFullYear()
          return `${day}-${month}-${year}`
        })()
      : ""

    const updateData = {
      ...hospital,
      establishedDate: formatedDate,
      doctors: hospital.doctors.map((doctor) => ({
        ...doctor,
        experienceYears: doctor.experienceYears.toString(),
      })),
      totalBeds: hospital.totalBeds.toString(),
    }

    form.reset(updateData)
  }, [form, hospital])

  const onSubmit = (data: hospitalFormData) => {
    console.log("submit clicked")
    const formData = new FormData()

    formData.append("hospitalName", data.hospitalName)
    formData.append("description", data.description || "")
    formData.append("phoneNumber", data.phoneNumber)
    formData.append("address.city", data.address.city)
    formData.append("address.country", data.address.country)
    formData.append("address.state", data.address.state)
    formData.append("hospitalType", data.hospitalType)
    formData.append("establishedDate", data.establishedDate?.toString() || "")
    formData.append("totalBeds", data.totalBeds.toString())

    data.departments?.forEach((department, index) => {
      formData.append(`departments[${index}]`, department)
    })

    data.services?.forEach((service, index) => {
      formData.append(`services[${index}]`, service)
    }),
      formData.append("doctors", JSON.stringify(data.doctors))
    if (data.picture) {
      formData.append("picture", data.picture)
    }

    onSave(formData)
  }

  // const watch = form.watch()
  // console.log("Watch : ", watch)

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
        <div className="flex justify-between">
          {loading ? <LoadingBtn /> : <Button type="submit">Submit</Button>}
          {deleteLoding ? (
            <LoadingBtn />
          ) : (
            <Button
              className="text-white bg-red-500 hover:underline font-semibold"
              variant="outline"
              onClick={deleteHospital}
            >
              Delete
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  )
}

export default HospitalCreateForm
