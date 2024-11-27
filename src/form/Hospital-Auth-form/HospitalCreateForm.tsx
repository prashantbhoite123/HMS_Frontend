import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from "react"

import DetailSection from "./DetailSection"
import ImageSection from "./ImageSection"
import { Separator } from "@/components/ui/separator"
import AddressSection from "./AddressSection"
import DepartmentSection from "./DepartmentSection"
import { Button } from "@/components/ui/button"
import ServicesSection from "./ServicesSection"

import LoadingBtn from "@/components/LoadingBtn"
import { IHospital } from "@/Types/hospital"

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
  totalBeds: z
    .string()
    .min(1, { message: "Total beds must be a positive integer" }),
  departments: z.array(z.string().trim()).optional(),
  services: z.array(z.string().trim()).optional(),
  pictureUrl: z.string().optional(),
  // picture: z.instanceof(File, { message: "Image is required" }).optional(),
  picture: z.instanceof(File).optional(),
})

export type hospitalFormData = z.infer<typeof formSchema>

type Props = {
  deleteHospital: () => void
  deleteLoding: boolean
  hospital?: IHospital | string
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

  const [message, setMessage] = useState("Hospital not found")

  useEffect(() => {
    if (typeof hospital === "string") {
      setMessage(hospital)
      return
    }

    if (hospital && typeof hospital === "object") {
      setMessage("Approved")
      const formattedDate = hospital.establishedDate
        ? (() => {
            const date = new Date(hospital.establishedDate)
            const day = String(date.getDate()).padStart(2, "0")
            const month = String(date.getMonth() + 1).padStart(2, "0")
            const year = date.getFullYear()
            return `${day}-${month}-${year}`
          })()
        : ""

      const updateData: hospitalFormData = {
        hospitalName: hospital.hospitalName,
        description: hospital.description || "",
        phoneNumber: hospital.phoneNumber,
        address: hospital.address,
        hospitalType: hospital.hospitalType || "",
        establishedDate: formattedDate,
        totalBeds: hospital.totalBeds.toString(),
        departments: hospital.departments || [],
        services: hospital.services || [],
        picture: typeof hospital.picture === "string" ? hospital.picture : "",
        pictureUrl: undefined,
      }
      form.reset(updateData)
    }
  }, [form, hospital])

  const onSubmit = (data: hospitalFormData) => {
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
    })

    if (data.picture) {
      formData.append("picture", data.picture)
    }

    onSave(formData)
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 shadow-gray-400 shadow-xl p-10 rounded-lg"
      >
        <DetailSection message={message} />

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
          {loading ? (
            <LoadingBtn />
          ) : (
            <Button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-pink-600 space-x-4 text-white font-semibold rounded-lg py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
            >
              Submit
            </Button>
          )}
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
