import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useMyResendOtp, useMyVarifyOtp } from "@/Api/common_Api/useAdminApi"
import LoadingBtn from "@/components/LoadingBtn"
import { useLocation } from "react-router-dom"
import "../../App.css"
import otpImage from "../../assets/otpLock-removebg-preview (1).png"
const AdminOtp = () => {
  const location = useLocation()
  const urlPrams = new URLSearchParams(location.search)
  const otpExpiry: any = urlPrams.get("tab")

  const {
    otpresend,
    isLoading: resendotpL,
    otpExpiry: resendOtpE,
  } = useMyResendOtp()

  // console.log("===>", resendOtpE)
  // console.log(otpExpiry)
  const { varifyOtp, isLoading } = useMyVarifyOtp()
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""))
  const [timeLeft, setTimeLeft] = useState(
    Math.max((resendOtpE || otpExpiry) - Date.now(), 0)
  )

  useEffect(() => {
    const timer = setInterval(() => {
      const remainingTime = Math.max((resendOtpE || otpExpiry) - Date.now(), 0)
      setTimeLeft(remainingTime)

      if (remainingTime === 0) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [otpExpiry, resendOtpE])

  const formatTimeLeft = (time: any) => {
    const minutes = Math.floor(time / (1000 * 60))
    const seconds = Math.floor((time % (1000 * 60)) / 1000)
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }
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
  const handelOtpResend = () => {
    otpresend()
  }
  return (
    <div className="flex justify-center items-center w-full h-[100%]">
      <div className=" flex flex-col justify-center items-center p-6 bg-slate-200  rounded-lg shadow-lg w-96 ">
        <img
          src={otpImage}
          draggable="false"
          alt="otpimg"
          className="w-20 select-none pointer-events-none"
        />
        <div className="mb-4 text-center">
          <h2 className="text-lg font-bold text-green-500 ">
            Varify Your Email Address
          </h2>
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
              className="otp-input w-12 h-12 mx-1 text-center border border-gray-300 rounded"
              maxLength={1}
              type="text"
              inputMode="numeric"
              autoFocus={index === 0}
            />
          ))}
        </div>

        <p className="text-center text-sm font-semibold text-red-500">
          Time remaining:{" "}
          {timeLeft > 0 ? formatTimeLeft(timeLeft) : "OTP expired"}
        </p>
        <div className="flex flex-col items-center gap-y-2 mt-4">
          {isLoading ? (
            <LoadingBtn />
          ) : (
            <Button
              type="submit"
              onClick={handleSubmit}
              className="bg-gradient-to-r   from-green-400 to-blue-400 text-white w-52 font-semibold rounded-full  shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
            >
              Varify code
            </Button>
          )}
          <Button
            variant="link"
            type="submit"
            disabled={resendotpL}
            onClick={handelOtpResend}
            className=" text-blue-500 font-semibold w-52 rounded-lg "
          >
            {resendotpL ? <span>Loading</span> : <span>Resend OTP</span>}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AdminOtp
