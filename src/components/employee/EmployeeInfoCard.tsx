import { ChangeEvent, useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { CalenderIcon } from "../../icons";
import { getEmployeeById, updateEmployee, updateProfilePicture } from "../../services/employeeService";
import { useParams } from "react-router";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  nic: string;
  joinedDate: Date;
  email: string;
  phone: string;
  address?: string;
  image: string;
  designation: string;
}

export default function EmployeeInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [employee, setEmployee] = useState<any>({} as Employee);
  const [formData, setFormData] = useState({} as Employee);
  const [error, setError] = useState<string>("");

  const { id } = useParams<{ id: string }>();

  const handleEditChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: string, date: Date[]) => {
    setFormData({ ...formData, [name]: date[0] });
  };

  const handleSave = async() => {
    setEmployee(formData); // Apply changes
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        nic: formData.nic,
        address: formData.address,
        designation: formData.designation,
        joinedDate: new Date(formData.joinedDate).toISOString().split("T")[0],
      };
  
     await updateEmployee(id as string, payload);
      closeModal();  
    } catch (err:any) {
      const errorMessage = err.response?.data?.message.message;
      if(errorMessage instanceof Array) {
        setError(errorMessage[0]);
      } else {
        setError(errorMessage);
      }
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !id) return;
  
    try {
      const response = await updateProfilePicture(id, file);
      const updatedImage = response.image;
  
      setEmployee((prev: Employee) => ({
        ...prev,
        image: updatedImage,
      }));
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };
  

  const openEditModal = () => {
    setFormData(employee);
    openModal();
  };
  const fetchEmployeeData = async () => {
      const data  = await getEmployeeById(id as string);
      const payload:Employee = {
        id: data.id,
        firstName: data.profile.firstName || "",
        lastName: data.profile.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
        nic: data.profile.nic || "",
        address: data.profile.address || "",
        designation: data.profile.designation || "",
        joinedDate: data.profile.joinedDate,
        image: data.image,
      }; 
      setEmployee(payload);
      setFormData(payload);
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between mb-5">
      <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
  <div className="relative text-center">
    <div
      className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800 cursor-pointer"
      onClick={() => document.getElementById("profileImageInput")?.click()}
    >
      <img
        src={employee.image}
        alt={employee.firstName}
        className="w-full h-full object-cover"
      />
    </div>
    <p
      className="text-xs text-blue-600 cursor-pointer mt-1"
      onClick={() => document.getElementById("profileImageInput")?.click()}
    >
      Edit
    </p>
    <input
      type="file"
      id="profileImageInput"
      accept="image/*"
      className="hidden"
      onChange={handleImageUpload}
    />
  </div>
  <div className="order-3 xl:order-2">
    <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
      {employee.firstName} {employee.lastName}
    </h4>
    <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {employee.designation}
      </p>
    </div>
  </div>
</div>

      </div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {employee.email}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Phone
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {employee.phone}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                NIC / Passport
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {employee.nic}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {employee.address}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Joined Date
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {new Date(employee.joinedDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Annual Leaves
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                0
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Casual Leaves
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                0
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Medical Leaves
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                0
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openEditModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Edit
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update details to keep employee profile up-to-date.
            </p>
          </div>
          {/* Error message */}
          {error && (
            <div className="px-4 py-2 text-sm text-red-600 bg-red-100 rounded-md">
              {error}
            </div>
          )}
          <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      value={formData.firstName}
                      name="firstName"
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Last Name</Label>
                    <Input
                      type="text"
                      value={formData.lastName}
                      name="lastName"
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Email Address</Label>
                    <Input
                      type="text"
                      value={formData.email}
                      name="email"
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Phone</Label>
                    <Input
                      type="text"
                      value={formData.phone}
                      name="phone"
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Joined Date</Label>
                    <div className="relative w-full flatpickr-wrapper">
            <Flatpickr
              value={formData.joinedDate} // Set the value to the state
              onChange={(date) => handleDateChange("joinedDate",date)} // Handle the date change
              options={{
                dateFormat: "Y-m-d", // Set the date format
              }}
              placeholder="Select an option"
              className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <CalenderIcon className="size-6" />
            </span>
          </div>
                  </div>
                  <div className="col-span-2">
                    <Label>NIC</Label>
                    <Input
                      type="text"
                      value={formData.nic}
                      name="nic"
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Address</Label>
                    <Input
                      type="text"
                      value={formData.address}
                      name="address"
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Designation</Label>
                    <Input
                      type="text"
                      value={formData.designation}
                      name="designation"
                      onChange={handleEditChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
