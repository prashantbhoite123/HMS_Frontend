import FormInput from "../Common_Form/FormInput"

const VisitHistory = () => {
  return (
    <>
      <div className=" p-4  rounded-md ">
        <h2 className="text-lg font-semibold mb-4">Visit History</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            placeholder="Last Visit Date"
            label="Last Visit Date"
            type="date"
            name="visitHistory.lastVisitDate"
          />
          <FormInput
            placeholder="Assigned Doctor"
            label="Assigned Doctor"
            name="visitHistory.assignedDoctor"
            type="text"
          />
          <FormInput
            placeholder="Last Visit Reason"
            label="Last Visit Reason"
            name="visitHistory.lastVisitReason"
            type="text"
          />
          <FormInput
            placeholder="Provider"
            label="Insurance Provider"
            name="insurance.provider"
            type="text"
          />
          <FormInput
            placeholder="Policy Number"
            label="Policy Number"
            name="insurance.policyNumber"
            type="text"
          />
        </div>
      </div>
    </>
  )
}

export default VisitHistory
