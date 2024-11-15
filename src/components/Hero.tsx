import heroImg from "@/assets/02Hero-removebg-preview.png"
import { motion } from "framer-motion"

const Hero = () => {
  return (
    <motion.img
      src={heroImg}
      draggable="false"
      className="w-full select-none pointer-events-none max-h-[500px] object-contain"
      animate={{ translateY: [-30, 30] }}
      transition={{
        repeat: Infinity,
        repeatType: "mirror",
        duration: 3,
        ease: "easeInOut",
      }}
    />
  )
}

export default Hero
