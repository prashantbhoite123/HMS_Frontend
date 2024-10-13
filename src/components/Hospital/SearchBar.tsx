import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "../ui/form"

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Hospital name is required",
  }),
})

export type SearchForm = z.infer<typeof formSchema>

type Props = {
  onSubmit: (formData: SearchForm) => void
  onReset?: () => void
}

const SearchBar = ({ onSubmit, onReset }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
  })

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    })
    if (onReset) {
      onReset()
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div
            className={`flex items-center justify-between p-3 border rounded-full  border-gray-500 ${
              form.formState.errors.searchQuery && "border-red-500"
            }`}
          >
            <Search className="size-8 text-green-500 hidden md:block" />
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
                      placeholder="Search hospital"
                      className="border-none shadow-none text-xl focus-visible:right-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {form.formState.isDirty && (
              <Button
                onClick={handleReset}
                variant="outline"
                className="border border-green-500 rounded-full"
              >
                Clear
              </Button>
            )}

            <Button className="bg-gradient-to-r ml-2 from-indigo-600 to-pink-600 hover:bg-white  hover:text-black rounded-full">
              Search
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default SearchBar
