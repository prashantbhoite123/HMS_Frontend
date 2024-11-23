import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ImCross } from "react-icons/im"
import { useFormContext } from "react-hook-form"

type Props = {
  index: number
  removeMenuItem: () => void
}

const VisiteInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext()

  return (
    <div className="grid grid-cols-2   items-end gap-2">
      <FormField
        control={control}
        name={`visitHistory.${index}.lastVisitDate`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              LastVisitDate <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                type="date"
                placeholder="Cheese Pizza"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`visitHistory.${index}.assignedDoctor`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              AssignedDoctor
              <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="assignedDoctor"
                className="bg-white "
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`visitHistory.${index}.lastVisitReason`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              LastVisitReason <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="lastVisitReason"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        type="button"
        onClick={removeMenuItem}
        className="bg-red-500 w-10"
      >
        <ImCross size={10} />
      </Button>
    </div>
  )
}

export default VisiteInput
