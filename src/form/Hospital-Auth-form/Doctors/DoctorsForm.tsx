import React, { useEffect, useState } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Webcam from "react-webcam"
import { Button } from "@/components/ui/button"
import FormInput from "@/form/Common_Form/FormInput"
import { doctorSpecializations, workingHours } from "@/config/DoctorData"
import { FaUserMd } from "react-icons/fa"
import { useMyDoctorRegister } from "@/Api/Hospital/useMyDoctor"

import { FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const doctorSchema = z.object({
  doctorName: z.string().min(1, "Doctor name is required").trim(),
  profilepic: z.string().optional().default("https://via.placeholder.com/150"),
  email: z.string().trim().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  dateOfBirth: z
    .string()
    .transform((val) => (val ? new Date(val) : null)) // Transform empty strings to null
    .refine(
      (val) => val === null || !isNaN(val.getTime()), // Allow null or valid Date
      {
        message: "Invalid date of birth",
      }
    ),
  gender: z.enum(["", "Male", "Female", "Other"], {
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
  degree: z
    .instanceof(FileList)
    .refine((files) => files?.length > 0, "Degree file is required"),

  education: z.string().min(1, "Education is required").trim(),
  experienceYears: z
    .string()
    .trim()
    .min(1, "Experience years must be required"),
  specialization: z.string().min(1, "Specialization is required").trim(),
  workingHours: z.string().min(1, "Working hours are required").trim(),
})

export type doctors = z.infer<typeof doctorSchema>

type Props = {
  hospitalId: String
}
const DoctorsForm = ({ hospitalId }: Props) => {
  const { watch } = useForm()
  const { doctorRegister, isLoading } = useMyDoctorRegister(
    hospitalId as string
  )
  const [image, setImage] = useState<string | null>(null)
  const [cameraOn, setCameraOn] = useState<boolean>(false)

  console.log(image)

  const webcamRef = React.useRef<Webcam>(null)

  console.log(watch("degree"))

  const form = useForm<doctors>({
    resolver: zodResolver(doctorSchema),
  })

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      setImage(imageSrc)
      const stream = webcamRef.current?.video?.srcObject as MediaStream
      stream?.getTracks().forEach((track) => track.stop())
      setCameraOn(false)
    }
  }

  console.log("hellow")
  const watchForm = form.watch()
  console.log(watchForm)

  const toggleCamera = () => {
    setCameraOn((prevState) => !prevState)
  }

  useEffect(() => {
    if (image) {
      form.setValue("profilepic", image)
    }
  }, [image, form])
  console.log("hello world")
  const onSave = async (data: doctors) => {
    console.log("click")
    try {
      const formData = new FormData()
      formData.append("doctorName", data.doctorName)
      formData.append("profilepic", image ? image : "")
      formData.append("email", data.email)
      formData.append("password", data.password)
      if (data.dateOfBirth) {
        formData.append("dateOfBirth", data.dateOfBirth.toISOString())
      } else {
        formData.append("dateOfBirth", "") 
      }
      formData.append("gender", data.gender)
      formData.append("age", data.age.toString())
      formData.append("phone", data.phone)

      formData.append("address.city", data.address.city)
      formData.append("address.state", data.address.state)
      formData.append("address.country", data.address.country)

      formData.append("education", data.education)
      formData.append("experienceYears", data.experienceYears)
      formData.append("specialization", data.specialization)
      formData.append("workingHours", data.workingHours)

      if (data.degree && data.degree[0]) {
        formData.append("degree", data.degree[0])
      }

      console.log("click 2")
      console.log("FormData entries:", [...formData.entries()])

      doctorRegister(formData)

      // Clear input fields
      form.setValue("doctorName", "")
      form.setValue("profilepic", "https://via.placeholder.com/150")
      form.setValue("email", "")
      form.setValue("password", "")
      form.setValue("dateOfBirth", null)
      form.setValue("gender", "")
      form.setValue("age", "")
      form.setValue("phone", "")
      form.setValue("address.city", "")
      form.setValue("address.state", "")
      form.setValue("address.country", "")
      form.setValue("education", "")
      form.setValue("experienceYears", "")
      form.setValue("specialization", "")
      form.setValue("workingHours", "")
      form.setValue("degree", undefined as unknown as FileList)

      // setImage(null)
      setCameraOn(false)
    } catch (error) {
      console.error("Error during registration:", error)
    }
  }

  const gender = ["", "Male", "Female", "Other"]

  return (
    <FormProvider {...form}>
      <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
          <h1 className="flex justify-center items-center gap-x-2 text-2xl font-semibold text-center text-green-500 mb-6">
            <span>
              <FaUserMd />
            </span>
            Doctor Registration
          </h1>

          <form onSubmit={form.handleSubmit(onSave)} className="">
            {/* Input Fields */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              <FormInput
                label="Doctor Name"
                placeholder="Enter full name"
                name="doctorName"
                type="text"
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
              <FormInput
                label="Email"
                placeholder="Enter email address"
                name="email"
                type="email"
              />
              <FormInput
                label="Password"
                placeholder="Enter password"
                name="password"
                type="password"
              />
              <FormInput
                placeholder="Age"
                label="Age"
                type="number"
                name="age"
              />
              <FormInput
                placeholder="Date of Birth"
                label="Date of Birth"
                type="date"
                name="dateOfBirth"
              />
              <FormInput
                placeholder="Phone"
                label="Phone"
                type="text"
                name="phone"
              />
              <FormInput placeholder="City" name="address.city" label="City" />
              <FormInput
                placeholder="State"
                name="address.state"
                label="State"
              />
              <FormInput
                placeholder="Country"
                name="address.country"
                label="Country"
              />
              <FormInput
                label="Education"
                placeholder="e.g., MBBS, MD"
                name="education"
                type="text"
              />
              <FormInput
                label="Experience Years"
                placeholder="Enter years of experience"
                name="experienceYears"
                type="number"
              />
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-black">
                  Specialization
                </label>
                <Controller
                  name="specialization"
                  control={form.control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="block w-full border-gray-500 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="" disabled>
                        Select specialization
                      </option>
                      {doctorSpecializations.map((specialization) => (
                        <option key={specialization} value={specialization}>
                          {specialization}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-black">
                  Working Hours
                </label>
                <Controller
                  name="workingHours"
                  control={form.control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="" disabled>
                        Select working hours
                      </option>
                      {workingHours.map((hours) => (
                        <option key={hours} value={hours}>
                          {hours} hours
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-black">
                  Upload Degree
                </label>
                <Controller
                  name="degree"
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  )}
                />
                <FormMessage />
              </div>
            </div>

            {/* Camera Section */}

            <div className="col-span-2 flex flex-col py-4 gap-4">
              {cameraOn ? (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-64 rounded-md border"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md">
                  <span className="text-gray-500">Camera is off</span>
                </div>
              )}

              <div className="mt-4 flex justify-between">
                <Button
                  type="button"
                  onClick={capture}
                  className=" bg-gradient-to-r from-indigo-600 to-pink-600 hover:shadow-xl transform  hover:scale-105 transition-transform"
                >
                  Capture Photo
                </Button>
                <Button
                  type="button"
                  onClick={toggleCamera}
                  className={`rounded-full py-0 px-3  hover:shadow-xl transform  hover:scale-105 transition-transform${
                    cameraOn
                      ? " bg-gradient-to-r  from-indigo-600 to-pink-600  hover:bg-gradient-to-r hover:from-indigo-600 hover:to-pink-600 pr-0 "
                      : "bg-slate-500 pl-0 "
                  } `}
                >
                  <span
                    className={`bg-slate-200 rounded-full h-[100%]  px-4 w-[20px] ${
                      cameraOn ? "hidden" : "block"
                    }`}
                  ></span>
                  {cameraOn ? " Off" : " On "}
                  <span
                    className={`bg-slate-200 rounded-full h-[100%] px-4 w-[20px] ${
                      cameraOn ? "block" : "hidden"
                    }`}
                  ></span>
                </Button>
              </div>
            </div>
            {/* Submit Button */}
            <div className="col-span-2">
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-md py-2"
              >
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </div>
          </form>
          <div className="">
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </FormProvider>
  )
}

export default DoctorsForm
