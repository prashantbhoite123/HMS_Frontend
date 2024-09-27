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
  logo: z.any().refine((files) => files instanceof File, "Logo is required"), // Refine to ensure it's a file
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
}

const HospitalSignUp = ({ createHospital, isLoading }: Props) => {
  const form = useForm<HosFormData>({
    resolver: zodResolver(formSchema),
  })

  const onSave = async (data: HosFormData) => {
    const formData = new FormData()
    formData.append("hosname", data.hosname)
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("contact", data.contact)
    formData.append("logo", data.logo)

    // Handle file upload

    for (let [key, value] of formData.entries()) {
      console.log(`${key}`, value)
    }

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
                Hospital Registration Form
              </h2>
              <FormDescription className="mb-3">Fill the form</FormDescription>
            </div>

            <FormField
              control={form.control}
              name="hosname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hospital Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white"
                      placeholder="Hospital Name"
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

            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(event) =>
                        field.onChange(
                          event.target.files ? event.target.files[0] : null
                        )
                      }
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
