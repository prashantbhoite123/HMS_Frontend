import { DialogContent } from "../ui/dialog"

type Props = {
  picture: string
}
const HosImageDialog = ({ picture }: Props) => {
  return (
    <>
      <DialogContent className=" flex justify-center items-center bg-slate-100 p-0">
        <div className="h-full w-full">
          <img className="rounded-md h-full w-full" src={picture} alt="" />
        </div>
      </DialogContent>
    </>
  )
}

export default HosImageDialog
