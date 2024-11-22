import FormInput from "../Common_Form/FormInput"

const VisitHistory = () => {
  return (
    <>
      <FormInput
        placeholder="lastVisitDate"
        label="LastVisitDate"
        type="date"
        name="visitHistory.lastVisitDate"
      />
      <FormInput
        placeholder="assignedDoctor"
        label="AssignedDoctor"
        type="text"
        name="visitHistory.assignedDoctor"
      />
      <FormInput
        placeholder="lastVisitReason"
        label="LastVisitReason"
        type="text"
        name="visitHistory.lastVisitReason"
      />

      <FormInput
        placeholder="provider"
        label="Provider"
        type="text"
        name="insurance.provider"
      />

      <FormInput
        placeholder="policyNumber"
        label="PolicyNumber"
        type="text"
        name="insurance.policyNumber"
      />
    </>
  )
}

export default VisitHistory
