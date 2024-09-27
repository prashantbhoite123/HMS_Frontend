// // import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

// const formSchema = z.object({
//   email: z.string().trim().email("Invalid email format"),
//   hosname: z.string().trim().min(1, "Hosname is required"),
//   password: z
//     .string()
//     .trim()
//     .min(6, "Password must be at least 6 characters long")
//     .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
//   contact: z
//     .string()
//     .trim()
//     .min(10, "Phone number must be at least 10 characters long")
//     .regex(/^\+?[1-9]\d{1,14}$/, "Phone number must be a valid format"),

//   logo: z.any().refine((files) => files?.length === 1, "Logo is Requirred"),
// })

// export type HosFormData = z.infer<typeof formSchema>
// import {
//   Form,
//   FormField,
//   FormControl,
//   FormDescription,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"

// type Props = {
//   registerhospital: () => void
//   isLoading: boolean
// }

// const HospitalSignUp = ({ registerhospital, isLoading }: Props) => {
//   const form = useForm<HosFormData>({
//     resolver: zodResolver(formSchema),
//   })

//   const onSave = async (data: HosFormData) => {
//     const formData = new FormData()

//     formData.append("hosname", data.hosname)
//     formData.append("email", data.email)
//     formData.append("password", data.password)
//     formData.append("contact", data.contact)

//     try {
//       await registerhospital(formData)
//     } catch (error) {
//       console.log(`Error registration hospital`, error)
//     }
//   }

//   return (
//     <>
//       <div className=" flex flex-col border w-full  md:w-[50vw] p-5 md:p-10 shadow-lg rounded-lg">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSave)}>
//             <div className=" mb-4 flex gap-2 flex-col text-center">
//               <h2 className=" text-2xl font-semibold">
//                 Hospital Registartion form
//               </h2>
//               <FormDescription className="mb-3">Fill the form</FormDescription>
//             </div>
//             <FormField
//               control={form.control}
//               name="hosname"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Hospital Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       className="bg-white"
//                       placeholder="Hospital Name"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       className="bg-white"
//                       placeholder="Email"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       className="bg-white"
//                       placeholder="Password"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="contact"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Contact</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       type="tel"
//                       className="bg-white"
//                       placeholder="Contact"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="logo"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Logo</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       type="file"
//                       className="bg-white"
//                       placeholder="logo"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-green-400 to-blue-400 mt-5 text-white font-semibold rounded-lg py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
//             >
//               {isLoading ? "Loading" : "Submit"}
//             </Button>
//           </form>
//         </Form>
//       </div>
//     </>
//   )
// }

// export default HospitalSignUp

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

  logo: z.any().refine((files) => files?.length > 0, "Logo is required"),
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

    // Handle file upload
    const file = data.logo[0]
    formData.append("logo", file)

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
                      {...field}
                      type="file"
                      className="bg-white"
                      placeholder="logo"
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
