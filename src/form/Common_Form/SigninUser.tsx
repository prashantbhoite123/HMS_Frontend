import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
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
import GoogleAuthBtn from "@/components/GoogleAuthBtn"
import LoginBtn from "@/components/LoginBtn"
import { Link } from "react-router-dom"

type Props = {
  signInUser: (data: FormData) => void
  isLoading: boolean
}

const SigninUser = ({ signInUser, isLoading }: Props) => {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(formSchema),
  })

  const onSave = async (data: SignInFormData) => {
    const formData = new FormData()
    formData.append("email", data.email)
    formData.append("password", data.password)
    try {
      await signInUser(formData)
    } catch (error) {
      console.log(`Error signing in`, error)
    }
  }

  return (
    <div className="flex flex-col border w-full md:w-[35vw] p-5 md:p-10 shadow-lg rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)}>
          <div className="mb-6 flex gap-2 flex-col text-center">
            <h2 className="text-2xl font-semibold">Sign In</h2>
          </div>

          {/* Email field with margin-bottom */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                {" "}
                {/* Added mb-4 for spacing */}
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

          <div className="mb-6">
            {" "}
            <GoogleAuthBtn role={null} />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-400 to-blue-400 text-white font-semibold rounded-lg py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
          >
            {isLoading ? "Loading" : "Sign In"}
          </Button>

          {/* Sign-Up Link with margin-top */}
          <div className="flex justify-between">
            <span className="flex mt-5 text-blue-500 hover:underline">
              <LoginBtn />
            </span>
            <span className="flex mt-5 text-blue-500 font-semibold text-sm hover:underline">
              <Link to="/admin-sign">Admin</Link>
            </span>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SigninUser
