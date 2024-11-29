import FormInput from "@/form/Common_Form/FormInput"
import { Form } from "../ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"

type ProfileData = {
  _id: string
  username: string
  email: string
  password: string
  role: string
  admin: {
    isAdmin: boolean
    key: number
    logedin: boolean
    _id: string
    Akey: number
  }
  profilepic: string
  createdAt: string
  updatedAt: string
  __v: number
}

type Props = {
  ProfileData: ProfileData
}

const formSchema = z.object({
  email: z.string().trim().email("Invalid email format").optional(),
  username: z.string().trim().min(1, "Username is required").optional(),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character")
    .optional(),
})

export type profileForm = z.infer<typeof formSchema>

const DashProfile = ({ ProfileData }: Props) => {
  const form = useForm<profileForm>({
    resolver: zodResolver(formSchema),
  })

  const onSave = () => {}

  return (
    <div className="flex flex-col space-y-3 items-center justify-center mt-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)}>
          <div className="flex flex-col items-center justify-center rounded-lg shadow-2xl shadow-slate-400 p-6 w-[90vw] md:w-[50vw] lg:w-[35vw] space-y-5">
            <div className="">
              <h1 className="font-semibold text-2xl">Profile</h1>
            </div>
            <div className="rounded-full w-28 h-28 self-center cursor-pointer shadow-md overflow-hidden">
              <img
                draggable={false}
                src={ProfileData?.profilepic}
                alt=""
                className="rounded-full w-full h-full  select-none  object-cover border-8"
              />
            </div>
            <div className="w-full">
              <FormInput
                name="username"
                defaultValue={ProfileData?.username}
                placeholder="Username"
                type="text"
              />
            </div>
            <div className="w-full">
              <FormInput
                name="email"
                defaultValue={ProfileData?.email}
                placeholder="Username"
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
            <Button className="w-full  bg-gradient-to-r from-indigo-600 to-pink-600">
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default DashProfile
