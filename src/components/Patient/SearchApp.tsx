import { Search } from "lucide-react"
import { Form, FormControl, FormField, FormItem } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "hospital or appoinment no required",
  }),
})

export type appSearch = z.infer<typeof formSchema>

type Props = {
  onSubmit: (FormData: appSearch) => void
  searchQuery: string
}
const SearchApp = ({ onSubmit, searchQuery }: Props) => {
  const form = useForm<appSearch>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  })

  useEffect(() => {
    form.reset({ searchQuery })
  }, [form, searchQuery])

  // const { watch } = useForm()
  // console.log("search app form", form.watch())
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div
            className={`flex items-center justify-between p-1 border rounded-full  border-gray-500 ${
              form.formState.errors.searchQuery && "border-red-500"
            }`}
          >
            <Search className="size-5 text-green-500 hidden md:block" />
            <FormField
              control={form.control}
              name="searchQuery"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      autoFocus
                      style={{
                        outline: "none",
                        boxShadow: "none",
                        border: "none",
                      }}
                      placeholder="Search appoinment"
                      className="border-none shadow-none text-sm focus-visible:right-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-gradient-to-r ml-2 from-indigo-600 to-pink-600 hover:bg-white  hover:text-black rounded-full"
            >
              Search
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SearchApp
