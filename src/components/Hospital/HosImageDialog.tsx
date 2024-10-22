import { DialogContent } from "../ui/dialog"

type Props = {
  picture: string
}
const HosImageDialog = ({ picture }: Props) => {
  return (
    <>
      <DialogContent className=" flex justify-center items-center bg-slate-100 border border-none">
        <div className="w-[80vw] h-[80vw] md:h-[30vw] md:w-[30vw]">
          <img className="rounded-full h-full w-full" src={picture} alt="" />
        </div>
      </DialogContent>
    </>
  )
}

export default HosImageDialog
