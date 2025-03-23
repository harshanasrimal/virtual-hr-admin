import { ChangeEvent, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import { CalenderIcon, EyeCloseIcon, EyeIcon, TimeIcon } from "../../icons";
import Flatpickr from "react-flatpickr";
import Button from "../ui/button/Button";
import Radio from "../form/input/Radio";
import { preventDefault } from "@fullcalendar/core/internal";

interface Employee {
  id: number;
  lName: string;
  fName: string;
  nic: string;
  gender: string;
  dob: Date;
  joinedAt: Date;
  email: string;
  phone: string;
  address?: string;
  image: string;
  designation: string;
  employementType: "Full Time" | "Part Time" | "Contract" | "Internship";
  status: string;
  facebook?: string;
  xcom?: string;
  linkedin?: string;
  instagram?: string;
  totalAnnualLeave: number;
  remainingAnnualLeave: number;
  totalCasualLeave: number;
  remainingCasualLeave: number;
}

export default function AddEmployeeCard() {
  const emptyEmployee: Employee = {
    id: 0,
    lName: "",
    fName: "",
    nic: "",
    gender: "",
    dob: new Date(),
    joinedAt: new Date(),
    email: "",
    phone: "",
    address: "",
    image: "",
    designation: "",
    employementType: "Full Time",
    status: "",
    facebook: "",
    xcom: "",
    linkedin: "",
    instagram: "",
    totalAnnualLeave: 0,
    remainingAnnualLeave: 0,
    totalCasualLeave: 0,
    remainingCasualLeave: 0,
  };
  const [formData, setFormData] = useState(emptyEmployee);
  const handleEditChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    const event = {
      target: { name, value },
    } as React.ChangeEvent<HTMLInputElement>;

    handleEditChange(event);
  };

  const handleDateChange = (name: string, date: Date[]) => {
    setFormData({ ...formData, [name]: date[0] });
  };


  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
  };
  return (
    <ComponentCard title="Employee Details ">
      <div className="space-y-6">
        <div className="flex flex-col">
          <div className="overflow-y-auto px-2 pb-3">
            <div className="mb-7">
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                Personal Information
              </h5>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div className="col-span-2 lg:col-span-1">
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    value={formData.fName}
                    name="fName"
                    onChange={handleEditChange}
                  />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    value={formData.lName}
                    name="lName"
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

                <div className="col-span-2 lg:col-span-1">
                  <Label>Date of Birth</Label>
                  <div className="relative w-full flatpickr-wrapper">
                    <Flatpickr
                      value={formData.dob} // Set the value to the state
                      onChange={(date) => handleDateChange("dob", date)} // Handle the date change
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
                <div className="col-span-2 lg:col-span-1">
                  <Label>Gender</Label>
                  <div className="flex flex-wrap items-center gap-8">
                    <Radio
                      id="male"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={(value) => handleRadioChange("gender", value)}
                      label="Male"
                    />
                    <Radio
                      id="female"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={(value) => handleRadioChange("gender", value)}
                      label="Female"
                    />
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
                <div className="col-span-2 lg:col-span-1">
                  <Label>Employment Type</Label>
                  <select
                    value={formData.employementType}
                    name="employementType"
                    onChange={(e) => handleEditChange(e)}
                    className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <Label>Joined Date</Label>
                  <div className="relative w-full flatpickr-wrapper">
                    <Flatpickr
                      value={formData.joinedAt} // Set the value to the state
                      onChange={(date) => handleDateChange("joinedAt", date)} // Handle the date change
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
              </div>
            </div>
            <div>
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                Social Links
              </h5>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Facebook</Label>
                  <Input
                    type="text"
                    value={formData.facebook}
                    name="facebook"
                    onChange={handleEditChange}
                  />
                </div>

                <div>
                  <Label>X.com</Label>
                  <Input
                    type="text"
                    value={formData.xcom}
                    name="xcom"
                    onChange={handleEditChange}
                  />
                </div>

                <div>
                  <Label>Linkedin</Label>
                  <Input
                    type="text"
                    value={formData.linkedin}
                    name="linkedin"
                    onChange={handleEditChange}
                  />
                </div>

                <div>
                  <Label>Instagram</Label>
                  <Input
                    type="text"
                    value={formData.instagram}
                    name="instagram"
                    onChange={handleEditChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={() => setFormData(emptyEmployee)}>
              Clear
            </Button>
            <Button size="sm" onClick={handleSave}>Save Changes</Button>
          </div>
          </div>
      </div>
    </ComponentCard>
  );
}
