// import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  email: z.string().trim().optional(),
  hosname: z.string().trim().min(1, "Hosname is required"),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
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

function HospitalSignUp() {
  const form = useForm<HosFormData>({
    resolver: zodResolver(formSchema),
  })
  return (
    <>
      <div className="flex justify-center items-center border ">
        <Form {...form}>
          <form>
            <div>
              <h2>Hospital Registartion form</h2>
              <FormDescription>Fill the form</FormDescription>
            </div>
            <FormField
              control={form.control}
              name="hosname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>hosname</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </>
  )
}

export default HospitalSignUp
