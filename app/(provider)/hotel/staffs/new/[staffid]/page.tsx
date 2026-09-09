import EditStaffForm, {
  EditableStaffMember,
} from "@/components/editforns/editStaffForms";

const staff: EditableStaffMember = {
  id: "1",
  fullName: "John Rex",
  email: "rex@gmail.com",
  countryCode: "+237",
  phoneNumber: "236823",
  role: "Manager",
  permissionTemplate: "Restricted",
  status: "Active",
};

function EditStaff() {
  return (
    <div>
      <EditStaffForm staff={staff} />
    </div>
  );
}

export default EditStaff;
