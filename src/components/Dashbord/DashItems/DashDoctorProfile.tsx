import React, { useState } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { FiCamera } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import FormInput from "@/form/Common_Form/FormInput"
import { useUser } from "@/context/userContext"
import { useNavigate } from "react-router-dom"
import { BACKEND_API_URL } from "@/main"
import { toast } from "sonner"

import { doctorSpecializations, workingHours } from "@/config/DoctorData"
import { useMyUpdateDoctor } from "@/Api/Hospital/useMyDoctor"
import { BsHeartPulseFill } from "react-icons/bs"

export const doctorSchema = z.object({
  doctorName: z.string().optional(),
  profilepic: z.union([z.instanceof(File), z.undefined()]).optional(),
  email: z.string().email("Invalid email format").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["", "Male", "Female", "Other"]).optional(),
  age: z.union([z.number(), z.string()]).optional(),
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
  experienceYears: z.union([z.number(), z.string()]).optional(),
  specialization: z.string().optional(),
  workingHours: z.string().optional(),
})

export type updatedoctors = z.infer<typeof doctorSchema>
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
  const [imageFile, setImageFile] = useState<File | null>(null)
  const doctorData: Doctor | null = currentUser

  const { doctorUpdate, isLoading } = useMyUpdateDoctor(doctorData?._id || "")
  const formattedGender = Array.isArray(doctorData?.gender)
    ? doctorData.gender[0]
    : doctorData?.gender || ""

  const form = useForm<updatedoctors>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      doctorName: doctorData?.doctorName || "",
      profilepic: undefined,
      email: doctorData?.email || "",
      dateOfBirth: doctorData?.dateOfBirth || "",
      gender: formattedGender,
      age: doctorData?.age || "",
      phone: doctorData?.phone || "",
      address: {
        city: doctorData?.address?.city,
        state: doctorData?.address?.state,
        country: doctorData?.address?.country || "",
      },
      education: doctorData?.education || "",
      experienceYears: doctorData?.experienceYears || "",
      specialization: doctorData?.specialization || "",
      workingHours: doctorData?.workingHours || "",
    },
  })

  const onSave = async (data: updatedoctors) => {
    try {
      const formData = new FormData()
      formData.append("doctorName", data.doctorName || doctorData?.doctorName!)
      if (imageFile) {
        formData.append("profilepic", imageFile || undefined)
      } else {
        console.error("Image file is null")
      }
      formData.append("email", data.email || doctorData?.email!)
      formData.append("password", data.password || doctorData?.password!)
      if (data.dateOfBirth) {
        formData.append(
          "dateOfBirth",
          data.dateOfBirth || doctorData?.dateOfBirth!
        )
      } else {
        formData.append("dateOfBirth", "")
      }
      formData.append("gender", data.gender || formattedGender!)
      formData.append(
        "age",
        (data?.age !== undefined
          ? data.age.toString()
          : doctorData?.age?.toString())!
      )
      formData.append("phone", data.phone || doctorData?.phone!)

      formData.append(
        "address.city",
        data?.address?.city || doctorData?.address?.city!
      )
      formData.append(
        "address.state",
        data?.address?.state || doctorData?.address?.state!
      )
      formData.append(
        "address.country",
        data?.address?.country || doctorData?.address?.country!
      )

      formData.append("education", data.education || doctorData?.education!)
      formData.append(
        "experienceYears",
        (data?.experienceYears !== undefined
          ? data.experienceYears.toString()
          : doctorData?.experienceYears?.toString())!
      )
      formData.append(
        "specialization",
        data.specialization || doctorData?.specialization!
      )
      formData.append(
        "workingHours",
        data.workingHours || doctorData?.workingHours!
      )

      doctorUpdate(formData)
    } catch (error) {
      console.error("Error during update:", error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
      setImageFile(file)
    }
  }

  const naviagte = useNavigate()
  const { setCurrentUser } = useUser()
  const handleDelete = async () => {
    try {
      const responce = await fetch(
        `${BACKEND_API_URL}/api/doctor/delete/${currentUser?._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      )

      if (!responce.ok) {
        throw new Error("failed to delete Doctor")
      }

      const data = await responce.json()
      if (data.success === false) {
        return toast.error(data.message)
      }
      localStorage.removeItem("user")
      setCurrentUser(null)
      toast.success(data.message)
      naviagte("/")
    } catch (error) {
      console.log(error)
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
              disabled={isLoading}
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-pink-600"
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </Button>

            <div className="text-end">
              <span
                onClick={handleDelete}
                className=" font-semibold text-red-500 hover:underline hover:cursor-pointer "
              >
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
