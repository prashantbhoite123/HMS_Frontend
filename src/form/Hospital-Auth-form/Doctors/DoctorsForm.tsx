import React, { useState } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Webcam from "react-webcam"
import { Button } from "@/components/ui/button"
import FormInput from "@/form/Common_Form/FormInput"
import { doctorSpecializations, workingHours } from "@/config/DoctorData"

export const doctorSchema = z.object({
  doctorName: z.string().min(1, "Doctor name is required").trim(),
  profilePic: z
    .string()
    .url("Profile picture must be a valid URL")
    .default(
      "https://www.shutterstock.com/image-vector/doctor-icon-260nw-224509450.jpg"
    ),
  degree: z.string().url("Degree certificate must be a valid URL"),
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email is required")
    .refine((val) => val.length <= 256, {
      message: "Email should be under 256 characters",
    }),
  password: z.string().min(8, "Password must be at least 8 characters"),
  education: z.string().min(1, "Education is required").trim(),
  experienceYears: z
    .number()
    .int()
    .positive("Experience years must be a positive number"),
  specialization: z.string().min(1, "Specialization is required").trim(),
  workingHours: z.string().min(1, "Working hours are required").trim(),
})

export type doctors = z.infer<typeof doctorSchema>

const DoctorsForm = () => {
  const [image, setImage] = useState<string | null>(null)
  const [cameraOn, setCameraOn] = useState<boolean>(false)
  const webcamRef = React.useRef<Webcam>(null)

  console.log(image)

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

  const toggleCamera = () => {
    setCameraOn((prevState) => !prevState)
  }

  const onSave = (data: doctors) => {
    console.log("Form Data:", data)
  }

  return (
    <FormProvider {...form}>
      <div className="flex justify-center items-center  min-h-screen p-5">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-xl font-semibold text-center text-gray-800 mb-4">
            Doctor Registration
          </h1>
          <form
            onSubmit={form.handleSubmit(onSave)}
            className="grid gap-6 grid-cols-1 md:grid-cols-2"
          >
            {/* Inputs */}
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
              <label className="text-sm font-medium text-gray-700">
                Specialization
              </label>
              <Controller
                name="specialization"
                control={form.control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-400 focus:border-green-400"
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
              <label className="text-sm font-medium text-gray-700">
                Working Hours
              </label>
              <Controller
                name="workingHours"
                control={form.control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-400 focus:border-green-400"
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
            <FormInput
              label="Degree Certificate"
              name="degree"
              placeholder="Upload degree certificate"
              type="file"
            />
            {/* Camera & Capture Section */}
            <div className="col-span-2">
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
                <Button type="button" onClick={capture}>
                  Capture Photo
                </Button>
                <Button type="button" onClick={toggleCamera}>
                  {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
                </Button>
              </div>
            </div>
            {/* Submit Button */}
            <div className="col-span-2">
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  )
}

export default DoctorsForm
