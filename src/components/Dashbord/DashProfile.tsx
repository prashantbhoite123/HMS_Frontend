import FormInput from "@/form/Common_Form/FormInput"
import { Form } from "../ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { useState } from "react"
import { FiCamera } from "react-icons/fi"
import { useMyupdateProfile } from "@/Api/common_Api/useMyhospitalApi"
import { useUser } from "@/context/userContext"

// type currentUser = {
//   _id: string
//   username: string
//   email: string
//   password: string
//   role: string
//   admin: {
//     isAdmin: boolean
//     key: number
//     logedin: boolean
//     _id: string
//     Akey: number
//   }
//   profilepic: string
//   createdAt: string
//   updatedAt: string
//   __v: number
// }

const formSchema = z.object({
  email: z.string().trim().email("Invalid email format").optional(),
  username: z.string().trim().min(1, "Username is required").optional(),
  profilepic: z.union([z.instanceof(File), z.undefined()]).optional(),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character")
    .optional(),
})

export type profileForm = z.infer<typeof formSchema>

const DashProfile = () => {
  const { currentUser } = useUser()
  const { updateProfile, isLoading } = useMyupdateProfile(
    currentUser?._id as string
  )
  const [selectedImage, setSelectedImage] = useState(
    currentUser?.profilepic || ""
  )
  const [imagefile, setImageFile] = useState<File | null>(null) 
  const form = useForm<profileForm>({
    resolver: zodResolver(formSchema),
  })

  console.log("iamge=>", imagefile)
  const onSave = (data: profileForm) => {
    if (imagefile) {
      const formData = new FormData()

      formData.append("username", data?.username || currentUser?.username || "")
      formData.append("email", data?.email || currentUser?.email || "")
      formData.append("password", data?.password || currentUser?.password || "")
      formData.append("profilepic", imagefile)
      console.log("Updated profile data:", data)

      console.log("FormData entries:", [...formData.entries()])
      updateProfile(formData)
    } else {
      console.error("Please upload a profile picture.")
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
      setImageFile(file)
    }
  }

  return (
    <div className="flex flex-col space-y-3 items-center justify-center mt-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)}>
          <div className="flex flex-col items-center justify-center rounded-lg shadow-2xl shadow-slate-400 p-6 w-[90vw] md:w-[50vw] lg:w-[35vw] space-y-5">
            <div>
              <h1 className="font-semibold text-2xl">Profile</h1>
            </div>
            <div className="relative rounded-full w-28 h-28 self-center cursor-pointer shadow-md overflow-hidden">
              <img
                draggable={false}
                src={selectedImage || "/default-profile.png"} // Use a fallback image URL
                alt="Profile"
                className="rounded-full w-full h-full select-none object-cover border-8"
              />
              <label
                htmlFor="file-input"
                className="absolute bottom-1 right-1 bg-gray-200 p-2 rounded-full shadow-md cursor-pointer"
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
            <div className="w-full">
              <FormInput
                name="username"
                defaultValue={currentUser?.username}
                placeholder="Username"
                type="text"
              />
            </div>
            <div className="w-full">
              <FormInput
                name="email"
                defaultValue={currentUser?.email}
                placeholder="Email"
                type="text"
              />
            </div>
            <div className="w-full">
              <FormInput
                name="password"
                placeholder="Password"
                type="password"
              />
            </div>
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-pink-600"
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
            <div className="flex w-full justify-end text-red-500 hover:underline font-semibold hover:cursor-pointer">
              <span>Delete</span>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default DashProfile
