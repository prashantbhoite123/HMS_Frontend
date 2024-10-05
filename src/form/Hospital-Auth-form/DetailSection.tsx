import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import FormInput from "../Common_Form/FormInput"
import { Controller, useFormContext } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { hospitalType } from "@/config/HospitalData"

function DetailSection() {
  const { control, watch } = useFormContext()
  console.log(watch)
  return (
    <div className="space-y-8 ">
      <div className="">
        <h2 className="text-lg font-bold">Hospital Details</h2>
        <FormDescription>
          Enetr the details about your restaurant
        </FormDescription>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 p-2 gap-5 text-black">
        <FormInput
          label="Hospital Name"
          name="hospitalName"
          type="text"
          placeholder="enter hospital name"
        />
        <FormInput
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          placeholder="enter phone number"
        />

        <FormInput
          label="establishedDate"
          name="establishedDate"
          type="date"
          placeholder="enter hospital name"
        />
        <FormInput
          label="Total Beds"
          name="totalBeds"
          type="number"
          placeholder="enter number of beads"
        />

        <div className="flex md:mx-5 sm:flex-row flex-col ">
          <div className="w-full">
            <label htmlFor="experienceLevel" className="text-sm font-semibold">
              Hospital Type
            </label>
            <Controller
              name="hospitalType"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="block w-full cursor-pointer appearance-none text-black bg-white border border-gray-300 rounded-md py-2 px-3 pr-10 text-base focus:outline-none focus:ring-indigo-500 focus:border-green-400 sm:text-sm"
                >
                  {hospitalType.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              )}
            />
                      
            <div className="w-full ">
              <Controller
                name="description"
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="resize-none border border-slate-400 rounded-[5px] text-black focus:outline-cyan-600"
                        autoFocus
                        placeholder="Add discription"
                      />
                    </FormControl>

                    <FormMessage className="text-red-600"></FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailSection
