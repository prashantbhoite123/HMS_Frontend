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

export const patientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dateOfBirth: z.string().transform((val) => new Date(val)),
  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Gender must be Male, Female, or Other" }),
  }),
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .min(0, "Age must be a positive number"),

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
    allergies: z.array(z.string()).optional(),
    chronicConditions: z.array(z.string()).optional(),
    pastSurgeries: z.array(z.string()).optional(),
    currentMedications: z.array(z.string()).optional(),
  }),
  currentMedicalInfo: z.object({
    reasonForVisit: z.string().min(1, "Reason for visit is required"),
    symptoms: z.array(z.string()).min(1, "At least one symptom is required"),
    vitalSigns: z.object({
      bloodPressure: z.string().optional(),
      heartRate: z
        .number({ invalid_type_error: "Heart rate must be a number" })
        .optional(),
      temperature: z
        .number({ invalid_type_error: "Temperature must be a number" })
        .optional(),
      weight: z
        .number({ invalid_type_error: "Weight must be a number" })
        .optional(),
    }),
  }),
  visitHistory: z
    .array(
      z.object({
        lastVisitDate: z.string().transform((val) => new Date(val)),
        assignedDoctor: z.string().min(1, "Assigned doctor is required"),
        lastVisitReason: z
          .array(z.string())
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

const onSave = () => {}
const ProfileForm = () => {
  const form = useForm<Patient>({
    resolver: zodResolver(patientSchema),
  })

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-4 shadow-xl shadow-slate-500 p-6 rounded-md bg-white"
      >
        <div>
          <div className="">
            <span className="flex items-center gap-x-3 px-4 py-2 bg-gradient-to-r text-2xl font-bold from-indigo-600 to-pink-600 rounded-md text-transparent bg-clip-text">
              <span>
                <BsHeartPulseFill className="text-pink-600" size="25" />
              </span>
              <span>CarePlusX</span>
            </span>
          </div>
          <div className="px-6 py-2 mt-2">
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-pink-600  text-transparent bg-clip-text">
              Welcome
            </h1>
            <h6 className="text-sm text-slate-700 font-semibold">
              Let us know more about yourself
            </h6>
          </div>
        </div>

        <DetailSection />
        <AddressSection />
        <EmergencyContact />
        <MedicalHistory />
        <CurrentMedicalInfo />
        <VisitHistory />
        <div className="col-span-2">
          <Button
            // disabled={isLoading}
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-md py-2"
          >
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default ProfileForm
