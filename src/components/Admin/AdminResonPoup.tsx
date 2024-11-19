import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { Textarea } from "../ui/textarea"

const AdminResonPoup = () => {
  return (
    <div>
      <Dialog>
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
            <Textarea placeholder="fill the reason" />
          </div>
          <Button className="bg-red-500 text-lg">Reject</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AdminResonPoup
