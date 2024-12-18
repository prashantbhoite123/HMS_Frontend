import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useFormContext } from "react-hook-form"

const ImageSection = () => {
  const { control, watch } = useFormContext()

  const [image, setImage] = useState<File | null>(null)

  const picture = watch("picture")
  return (
    <div className="space-y-2">
      <div className="">
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an image that will be displayed on your hospital
        </FormDescription>
      </div>
      <div className="flex flex-col gap-8 w-[50%]">
        {picture && (
          <AspectRatio ratio={16 / 9}>
            <img
              src={image || picture}
              className="rounded-md object-cover h-full w-full"
            />
          </AspectRatio>
        )}
        <FormField
          control={control}
          name="picture"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(event) =>
                    field.onChange(
                      event.target.files ? event.target.files[0] : null,
                      setImage(
                        event.target.files ? event.target.files[0] : null
                      )
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default ImageSection
