import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { Textarea } from "../ui/textarea"
import LoadingBtn from "../LoadingBtn"
import { useMyRejectHospital } from "@/Api/Admin/useMyAdminRequest"

type Props = {
  hospitalId: string
}
function DashResonPopup({ hospitalId }: Props) {
  const { rejectionHos, isLoading } = useMyRejectHospital()
  const [getReson, setGetReson] = useState<string>("")
  const [open, setOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGetReson(e.target.value)
  }
  const handleSubmit = () => {
    setOpen(false)
    rejectionHos(getReson, hospitalId as string)
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button
            variant="outline"
            className="text-red-500 font-bold shadow-xl hover:text-red-500 hover:bg-white rounded-lg transition hover:scale-110 shadow-slate-300"
          >
            Rejected
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-100 text-black font-semibold ">
          <div className="">
            <h1 className="text-xl">Rejected Hospital</h1>
            <h6 className="text-sm text-slate-600">
              Please fill the following details to reject hospital
            </h6>
          </div>
          <div className="mt-4">
            <label className="text-slate-700">Reason for rejection</label>
            <Textarea
              placeholder="fill the reason"
              onChange={handleChange}
              className="text-slate-700"
            />
          </div>
          {isLoading ? (
            <LoadingBtn />
          ) : (
            <Button
              className="bg-gradient-to-r from-indigo-600 to-pink-600 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform "
              onClick={handleSubmit}
            >
              Reject
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DashResonPopup
