import React, { useState } from "react"
import Confetti from "react-dom-confetti"
import { Button } from "@/components/ui/button" // Replace with your actual button component path
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card" // Replace with your actual card component path
import { CheckCircle } from "lucide-react" // For the success icon
import { useNavigate } from "react-router-dom"

function SuccessfulyApp() {
  const [isConfettiActive, setIsConfettiActive] = useState(false)
  const navigate = useNavigate()
  const confettiConfig = {
    angle: 90,
    spread: 45,
    startVelocity: 20,
    elementCount: 70,
    dragFriction: 0.1,
    duration: 3000,
    stagger: 2,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#FFC700", "#FF5733", "#28A745", "#007BFF"],
  }

  const handleViewDetails = () => {
    navigate("/myappoinment")
    console.log("Viewing details...")
  }

  const handleGoHome = () => {
    navigate("/")
    console.log("Going home...")
  }

  React.useEffect(() => {
    setIsConfettiActive(true)
  }, [])

  return (
    <div className="flex items-center justify-center  bg-gray-50 p-4 relative">
      <div className="absolute">
        <Confetti active={isConfettiActive} config={confettiConfig} />
      </div>

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col items-center text-center">
          <CheckCircle className="text-green-600 w-12 h-12 mb-2" />
          <h2 className="text-lg font-semibold">
            Appointment Booked Successfully!
          </h2>
          <p className="text-gray-600 text-sm">
            Your appointment has been confirmed. You will receive a confirmation
            email shortly.
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-center font-semibold text-gray-700">
            Thank you for booking with us! If you have any questions, feel free
            to contact our support team.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <div className="flex justify-center rounded-lg transition-all hover:scale-x-105 items-center bg-gradient-to-r from-indigo-600 to-pink-600 relative">
            <Button
              onClick={handleGoHome}
              variant="outline"
              className="z-10 w-[95%] h-[95%] transition-all hover:scale-x-105"
            >
              Go to Home
            </Button>
            <div className="absolute inset-0 rounded-full animate-gradient-border bg-transparent"></div>
          </div>
          <div className="flex justify-center rounded-lg transition-all hover:scale-x-105 items-center bg-gradient-to-r from-indigo-600 to-pink-600 relative">
            <Button
              onClick={handleViewDetails}
              variant="outline"
              className="z-10 bg-white text-black w-[95%] h-[95%] transition-all hover:scale-x-105"
            >
              View Details
            </Button>
            <div className="absolute inset-0 rounded-full animate-gradient-border bg-transparent"></div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SuccessfulyApp
