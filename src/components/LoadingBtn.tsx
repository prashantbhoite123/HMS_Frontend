import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"

const LoadingBtn = () => {
  return (
    <div>
      <Button disabled>
        <Loader2 className="mr-2 h-4 bg-none animate-spin" />
      </Button>
    </div>
  )
}

export default LoadingBtn
