import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import DetailSection from "./DetailSection"
import AddressSection from "./AddressSection"
import EmergencyContact from "./EmergencyContact"
import MedicalHistory from "./MedicalHistory"
import CurrentMedicalInfo from "./CurrentMedicalInfo"
import VisitHistory from "./VisitHistory"
import { BsHeartPulseFill } from "react-icons/bs"
import { Button } from "@/components/ui/button"
import Patientinsurance from "./Patientinsurance"

export const patientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dateOfBirth: z
    .string()
    .transform((val) => new Date(val))
    .refine((val) => !isNaN(val.getTime()), {
      message: "Invalid date of birth",
    }),
  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Gender must be Male, Female, or Other" }),
  }),
  age: z
    .string({ invalid_type_error: "Age must be a number" })
    .min(0, "Age must be a positive number")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Age must be a positive number",
    }),

  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  address: z.object({
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
  }),

  emergencyContact: z.object({
    name: z.string().min(1, "Emergency contact name is required"),
    relation: z.string().min(1, "Relation is required"),
    phone: z
      .string()
      .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  }),
  medicalHistory: z.object({
    allergies: z.string().optional(),
    chronicConditions: z.string().optional(),
    pastSurgeries: z.string().optional(),
    currentMedications: z.string().optional(),
  }),
  currentMedicalInfo: z.object({
    reasonForVisit: z.string().min(1, "Reason for visit is required"),
    symptoms: z.string().min(1, "At least one symptom is required"),
    vitalSigns: z.object({
      bloodPressure: z.string().optional(),
      heartRate: z.string().min(1, "heart rate is required").optional(),
      temperature: z.string().min(1, "tempreture is  required").optional(),
      weight: z.string().min(1, "weight is required").optional(),
    }),
  }),
  visitHistory: z
    .array(
      z.object({
        lastVisitDate: z
          .string()
          .transform((val) => new Date(val))
          .refine((val) => !isNaN(val.getTime()), {
            message: "Invalid visit date",
          }),
        assignedDoctor: z.string().min(1, "Assigned doctor is required"),
        lastVisitReason: z
          .string()
          .min(1, "At least one reason for the last visit is required"),
      })
    )
    .optional(),
  insurance: z
    .object({
      provider: z.string().optional(),
      policyNumber: z.string().optional(),
    })
    .optional(),
})

export type Patient = z.infer<typeof patientSchema>

type Props = {
  patientData: (data: FormData) => void
  loading: boolean
}

const ProfileForm = ({ patientData, loading }: Props) => {
  const onSave = (data: Patient) => {
    const formData = new FormData()

    // Basic Info
    formData.append("name", data.name)
    formData.append("dateOfBirth", data.dateOfBirth.toISOString())
    formData.append("gender", data.gender)
    formData.append("age", data.age.toString())
    formData.append("phone", data.phone)

    // Address
    formData.append("address.city", data.address.city)
    formData.append("address.state", data.address.state)
    formData.append("address.country", data.address.country)

    // Emergency Contact
    formData.append("emergencyContact.name", data.emergencyContact.name)
    formData.append("emergencyContact.relation", data.emergencyContact.relation)
    formData.append("emergencyContact.phone", data.emergencyContact.phone)

    // Medical History
    if (data.medicalHistory) {
      formData.append(
        "medicalHistory.allergies",
        data.medicalHistory.allergies || ""
      )
      formData.append(
        "medicalHistory.chronicConditions",
        data.medicalHistory.chronicConditions || ""
      )
      formData.append(
        "medicalHistory.pastSurgeries",
        data.medicalHistory.pastSurgeries || ""
      )
      formData.append(
        "medicalHistory.currentMedications",
        data.medicalHistory.currentMedications || ""
      )
    }

    // Current Medical Info
    formData.append(
      "currentMedicalInfo.reasonForVisit",
      data.currentMedicalInfo.reasonForVisit
    )

    formData.append(
      "currentMedicalInfo.symptoms",
      data.currentMedicalInfo.symptoms || ""
    )

    if (data.currentMedicalInfo.vitalSigns) {
      if (data.currentMedicalInfo.vitalSigns.bloodPressure) {
        formData.append(
          "currentMedicalInfo.vitalSigns.bloodPressure",
          data.currentMedicalInfo.vitalSigns.bloodPressure
        )
      }
      if (data.currentMedicalInfo.vitalSigns.heartRate) {
        formData.append(
          "currentMedicalInfo.vitalSigns.heartRate",
          data.currentMedicalInfo.vitalSigns.heartRate
        )
      }
      if (data.currentMedicalInfo.vitalSigns.temperature) {
        formData.append(
          "currentMedicalInfo.vitalSigns.temperature",
          data.currentMedicalInfo.vitalSigns.temperature
        )
      }
      if (data.currentMedicalInfo.vitalSigns.weight) {
        formData.append(
          "currentMedicalInfo.vitalSigns.weight",
          data.currentMedicalInfo.vitalSigns.weight
        )
      }
    }

    // Visit History
    if (data.visitHistory) {
      data.visitHistory.forEach((visit, index) => {
        formData.append(
          `visitHistory[${index}].lastVisitDate`,
          visit.lastVisitDate.toISOString()
        )
        formData.append(
          `visitHistory[${index}].assignedDoctor`,
          visit.assignedDoctor
        )
        formData.append(
          `visitHistory[${index}].lastVisitReason`,
          visit.lastVisitReason
        )
      })
    }

    // Insurance
    if (data.insurance) {
      if (data.insurance.provider) {
        formData.append("insurance.provider", data.insurance.provider)
      }
      if (data.insurance.policyNumber) {
        formData.append("insurance.policyNumber", data.insurance.policyNumber)
      }
    }

    patientData(formData)
  }

  const form = useForm<Patient>({
    resolver: zodResolver(patientSchema),
  })

  const watch = form.watch()
  console.log(watch)

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-4 p-6 rounded-md bg-white"
      >
        <div>
          <div>
            <span className="flex items-center gap-x-3 px-4 py-2 bg-gradient-to-r text-2xl font-bold from-indigo-600 to-pink-600 rounded-md text-transparent bg-clip-text">
              <span>
                <BsHeartPulseFill className="text-pink-600" size="25" />
              </span>
              <span>CarePlusX</span>
            </span>
          </div>
          <div className="px-6 py-2 mt-2">
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-pink-600 text-transparent bg-clip-text">
              Welcome
            </h1>
            <h6 className="text-sm text-slate-700 font-semibold">
              Let us know more about you so that we can assist you better
            </h6>
          </div>
          <DetailSection />
          <AddressSection />
          <EmergencyContact />
          <MedicalHistory />
          <CurrentMedicalInfo />
          <VisitHistory />
          <Patientinsurance />
          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button
              disabled={loading}
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-pink-600"
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default ProfileForm
