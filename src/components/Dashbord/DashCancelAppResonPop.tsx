import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { Textarea } from "../ui/textarea"
import LoadingBtn from "../LoadingBtn"

type Props = {
  appId: string
}
function DashCancelAppResonPop({ appId }: Props) {
  const [getReson, setGetReson] = useState<string>("")
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  console.log(setLoading)
  console.log("this is reson=>", getReson)
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGetReson(e.target.value)
  }
  const handleSubmit = () => {
    setOpen(false)
    console.log(appId)
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button
            variant="outline"
            className="text-red-500 font-bold shadow-xl hover:text-red-500 hover:bg-white rounded-lg transition hover:scale-110 shadow-slate-300"
          >
            Cacel
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-100 text-black font-semibold ">
          <div className="">
            <h1 className="text-xl">Cancel Appoinment</h1>
            <h6 className="text-sm text-slate-600">
              Please fill the following details to cancel appoinment
            </h6>
          </div>
          <div className="mt-4">
            <label className="text-slate-700">Reason for Cancel</label>
            <Textarea
              placeholder="fill the reason"
              onChange={handleChange}
              className="text-slate-700"
            />
          </div>
          {loading ? (
            <LoadingBtn />
          ) : (
            <Button
              className="bg-gradient-to-r from-indigo-600 to-pink-600 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform "
              onClick={handleSubmit}
            >
              Cancel
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DashCancelAppResonPop
