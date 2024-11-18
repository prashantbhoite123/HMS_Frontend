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
import Loader from "@/components/Loader"

import {
  // FormControl,
  // FormField,
  // FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const doctorSchema = z.object({
  doctorName: z.string().min(1, "Doctor name is required").trim(),
  profilePic: z.string().optional().default("https://via.placeholder.com/150"),
  // degree: z.instanceof(File, { message: "degree is required" }),
  degree: z
    .instanceof(FileList)
    .refine((files) => files?.length > 0, "Degree file is required"),
  email: z.string().trim().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
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

  const watchForm = form.watch()
  console.log(watchForm)

  const toggleCamera = () => {
    setCameraOn((prevState) => !prevState)
  }

  useEffect(() => {
    if (image) {
      form.setValue("profilePic", image)
    }
  }, [image, form])

  const onSave = (data: doctors) => {
    const formData = new FormData()
    formData.append("doctorName", data.doctorName)
    formData.append("profilePic", image ? image : "") // Base64 image
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("education", data.education)
    formData.append("experienceYears", data.experienceYears)
    formData.append("specialization", data.specialization)
    formData.append("workingHours", data.workingHours)

    if (data.degree && data.degree[0]) {
      formData.append("degree", data.degree[0]) // Attach file
    }
    console.log("Doctor data =>", formData.entries())

    doctorRegister(formData)
  }

  if (isLoading) {
    return (
      <div className="h-full w-full justify-center items-center">
        <Loader />
      </div>
    )
  }
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
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-md py-2"
              >
                Submit
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
