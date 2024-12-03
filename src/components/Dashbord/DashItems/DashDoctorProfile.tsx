import React, { useState } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { FiCamera } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import FormInput from "@/form/Common_Form/FormInput"
import { useUser } from "@/context/userContext"

import { doctorSpecializations, workingHours } from "@/config/DoctorData"
import { useMyDoctorRegister } from "@/Api/Hospital/useMyDoctor"
import { BsHeartPulseFill } from "react-icons/bs"

export const doctorSchema = z.object({
  doctorName: z.string().optional(),
  profilepic: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["", "Male", "Female", "Other"]).optional(),
  age: z.string().optional(),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .optional(),
  address: z
    .object({
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),

  education: z.string().optional(),
  experienceYears: z.string().optional(),
  specialization: z.string().optional(),
  workingHours: z.string().optional(),
})

export type doctors = z.infer<typeof doctorSchema>
export interface Doctor {
  role?: string
  _id?: string
  doctorName?: string
  profilepic?: string
  degree?: string
  email?: string
  ownerId?: string
  hospitalId?: string
  password?: string
  education?: string
  experienceYears?: string
  specialization?: string
  workingHours?: string
  gender?: "" | "Male" | "Female" | "Other"
  address?: {
    city?: string
    state?: string
    country?: string
  }
  age?: string
  phone?: string
  dateOfBirth?: string
}
const UpdateDoctorProfile = () => {
  const { currentUser } = useUser()
  const [selectedImage, setSelectedImage] = useState(
    currentUser?.profilepic || ""
  )

  const data: Doctor | null = currentUser

  const { doctorRegister, isLoading } = useMyDoctorRegister(data?._id || "")
  const formattedGender = Array.isArray(data?.gender)
    ? data.gender[0]
    : data?.gender || ""

  const form = useForm<doctors>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      doctorName: data?.doctorName || "",
      profilepic: data?.profilepic || "",
      email: data?.email || "",
      dateOfBirth: data?.dateOfBirth || "",
      gender: formattedGender,
      age: data?.age || "",
      phone: data?.phone || "",
      address: {
        city: data?.address?.city,
        state: data?.address?.state,
        country: data?.address?.country || "",
      },
      education: data?.education || "",
      experienceYears: data?.experienceYears || "",
      specialization: data?.specialization || "",
      workingHours: data?.workingHours || "",
    },
  })

  const onSave = async (data: doctors) => {
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          if (key === "address") {
            Object.entries(value as object).forEach(([subKey, subValue]) => {
              formData.append(`address.${subKey}`, subValue as string)
            })
          } 
          else {
            formData.append(key, value as string)
          }
        }
      })

      doctorRegister(formData)
    } catch (error) {
      console.error("Error during update:", error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
    }
  }

  return (
    <FormProvider {...form}>
      <div className="flex flex-col items-center min-h-screen p-6 bg-gray-50">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">
            <div className="">
              <span className="flex text-2xl items-center font-bold gap-x-3 px-4 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-md text-transparent bg-clip-text">
                <span>
                  <BsHeartPulseFill className="text-pink-600" size="30" />
                </span>

                <span>CarePlusX</span>
              </span>

              <div className="relative rounded-full w-32 h-32 mx-auto cursor-pointer shadow-md overflow-hidden">
                <img
                  draggable={false}
                  src={selectedImage || "/default-profile.png"}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border"
                />
                <label
                  htmlFor="file-input"
                  className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full shadow-md cursor-pointer"
                >
                  <FiCamera className="text-gray-700 text-lg" />
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 gap-x-4">
              <FormInput
                label="Full Name"
                name="doctorName"
                placeholder="Enter full name"
              />
              <FormInput label="Email" name="email" placeholder="Enter email" />
              <FormInput
                label="Password"
                name="password"
                placeholder="Enter password"
                type="password"
              />
              <FormInput
                label="Phone"
                name="phone"
                placeholder="Enter phone number"
              />
              <FormInput
                label="Date of Birth"
                name="dateOfBirth"
                placeholder="Select date"
                type="date"
              />
              <FormInput
                label="Age"
                name="age"
                placeholder="Enter age"
                type="number"
              />
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormInput
                label="City"
                name="address.city"
                placeholder="Enter city"
              />
              <FormInput
                label="State"
                name="address.state"
                placeholder="Enter state"
              />
              <FormInput
                label="Country"
                name="address.country"
                placeholder="Enter country"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 gap-x-4">
              <FormInput
                label="Education"
                name="education"
                placeholder="e.g., MBBS, MD"
              />

              <Controller
                name="workingHours"
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium">
                      Working Hours
                    </label>
                    <select
                      {...field}
                      className="block w-full border rounded-md p-2"
                    >
                      <option value="" disabled>
                        Select Working Hours
                      </option>
                      {workingHours.map((hours) => (
                        <option key={hours} value={hours}>
                          {hours} hours
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              />

              {/* Dropdowns */}
              <Controller
                name="specialization"
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium">
                      Specialization
                    </label>
                    <select
                      {...field}
                      className="block w-full border rounded-md p-2"
                    >
                      <option value="" disabled>
                        Select Specialization
                      </option>
                      {doctorSpecializations.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              />
              <FormInput
                label="Experience Years"
                name="experienceYears"
                placeholder="Enter years of experience"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-pink-600"
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </Button>

            <div className="text-end">
              <span className=" font-semibold text-red-500 hover:underline hover:cursor-pointer ">
                Delete
              </span>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  )
}

export default UpdateDoctorProfile
