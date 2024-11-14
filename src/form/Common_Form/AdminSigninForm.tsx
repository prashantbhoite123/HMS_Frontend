import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  Akey: z
    .string()
    .trim()
    .regex(/^\d{4}$/, { message: "Key must be exactly 4 digits." }),
  email: z.string().trim().email("Invalid email format"),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
})

export type SignInFormData = z.infer<typeof formSchema>

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

type Props = {
  signInAdmin: (data: FormData) => void
  isLoading: boolean
}
function AdminSigninForm({ signInAdmin, isLoading }: Props) {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(formSchema),
  })

  const watch = form.watch()
  console.log("Watch : ", watch)
  const onSave = async (data: SignInFormData) => {
    const formData = new FormData()

    formData.append("key", data.Akey)
    formData.append("email", data.email)
    formData.append("password", data.password)
    try {
      await signInAdmin(formData)
    } catch (error) {
      console.log(`Error signing in`, error)
    }
  }

  return (
    <div className="flex flex-col border w-full md:w-[35vw] p-5 md:p-10 shadow-lg rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)}>
          <div className="mb-6 flex gap-2 flex-col text-center">
            <h2 className="text-2xl font-semibold">
              <span className="text-green-500">Admin-</span> Sign In
            </h2>
          </div>

          <FormField
            control={form.control}
            name="Akey"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Key</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" placeholder="key" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" placeholder="Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password field with margin-bottom */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-6">
                {" "}
                {/* Added mb-6 for larger spacing */}
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="bg-white"
                    placeholder="Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-400 to-blue-400 text-white font-semibold rounded-lg py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
          >
            {isLoading ? "Loading" : "Sign In"}
          </Button>
        </form>
      </Form>
      <div className="flex mt-5 text-blue-500 font-semibold text-sm hover:underline">
        <Link to="/signin">Sign-in</Link>
      </div>
    </div>
  )
}

export default AdminSigninForm
