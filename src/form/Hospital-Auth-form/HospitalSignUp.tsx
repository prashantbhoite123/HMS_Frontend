import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
  hosname: z.string().trim().min(1, "Hosname is required"),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
  contact: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 characters long")
    .regex(/^\+?[1-9]\d{1,14}$/, "Phone number must be a valid format"),
})

export type HosFormData = z.infer<typeof formSchema>

import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Props = {
  createHospital: (data: FormData) => void
  isLoading: boolean
  role: string | null
}

const HospitalSignUp = ({ createHospital, isLoading, role }: Props) => {
  const form = useForm<HosFormData>({
    resolver: zodResolver(formSchema),
  })

  const onSave = async (data: HosFormData) => {
    const formData = new FormData()
    formData.append("hosname", data.hosname)
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("contact", data.contact)

    const finalRole = role || "petient"
    formData.append("role", finalRole)
    try {
      await createHospital(formData)
    } catch (error) {
      console.log(`Error registering hospital`, error)
    }
  }

  return (
    <>
      <div className="flex flex-col border w-full md:w-[50vw] p-5 md:p-10 shadow-lg rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)}>
            <div className="mb-4 flex gap-2 flex-col text-center">
              <h2 className="text-2xl font-semibold">
                {role === "hospital"
                  ? "HospitalHospital Registration Form"
                  : "Petient Registration Form"}
              </h2>
              <FormDescription className="mb-3">Fill the form</FormDescription>
            </div>

            <FormField
              control={form.control}
              name="hosname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {role === "hospital" ? "Hospital Name" : "Petient Name"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white"
                      placeholder={
                        role === "hospital" ? "Hospital Name" : "Petient Name"
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white"
                      placeholder="Email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white"
                      placeholder="Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      className="bg-white"
                      placeholder="Contact"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-400 to-blue-400 mt-5 text-white font-semibold rounded-lg py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
            >
              {isLoading ? "Loading" : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}

export default HospitalSignUp
