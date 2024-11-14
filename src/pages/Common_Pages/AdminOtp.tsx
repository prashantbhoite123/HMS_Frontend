import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { useMyVarifyOtp } from "@/Api/common_Api/useAdminApi"
import LoadingBtn from "@/components/LoadingBtn"

const AdminOtp = () => {
  const { varifyOtp, isLoading } = useMyVarifyOtp()
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""))

  const handleInputChange = (index: number, value: string) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-slot-${index + 1}`)?.focus()
      }
    }
  }

  const handleBackspace = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        document.getElementById(`otp-slot-${index - 1}`)?.focus()
      }
    }
  }

  const handleSubmit = () => {
    varifyOtp(otp.join(""))
  }

  const handleResendOtp = () => {
    console.log("Resending OTP...")
  }

  return (
    <div className="flex justify-center items-center w-full h-[100%]">
      <div className="p-6 bg-slate-300 rounded-md shadow-md w-96 mt-8">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold text-green-500 ">One-Time OTP</h2>
          <p className="text-sm font-semibold mt-3">
            Please enter the one-time{" "}
            <span className="text-blue-500 font-bold">OTP</span> sent to your
            email
          </p>
        </div>

        <div className="flex justify-center mb-4">
          {otp.map((_, index) => (
            <input
              key={index}
              id={`otp-slot-${index}`}
              value={otp[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleBackspace(index, e)}
              className="w-12 h-12 mx-1 text-center border border-gray-300 rounded"
              maxLength={1}
              type="text"
              inputMode="numeric"
              autoFocus={index === 0}
            />
          ))}
        </div>

        <div className="flex justify-between mt-4">
          {isLoading ? (
            <LoadingBtn />
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-green-400 to-blue-400 text-white font-semibold rounded-lg py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
            >
              Submit
            </Button>
          )}
          <Button
            onClick={handleResendOtp}
            className="bg-gradient-to-r from-green-400 to-blue-400 text-white font-semibold rounded-lg py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
          >
            Resend OTP
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AdminOtp
