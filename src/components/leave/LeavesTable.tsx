import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Modal } from "../ui/modal";
import { useModal } from "../../hooks/useModal";

import Badge from "../ui/badge/Badge";
import { useState } from "react";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import TextArea from "../form/input/TextArea";
import Select from "../form/Select";

interface LeaveRequest {
  id: number;
  employeeName: string;
  employeeImage: string;
  createdAt: Date;
  from: Date;
  to: Date;
  type: "Annual" | "Casual" | "Sick";
  reason: string;
  note?: string;
  status: "Approved" | "Pending" | "Canceled" | "Rejected";
}

// Define the table data using the interface
const tableData: LeaveRequest[] = [
  {
    id: 1,
    employeeName: "Lindsey Curtis",
    employeeImage: "/images/user/user-17.jpg",
    createdAt: new Date("2025-09-01"),
    from: new Date("2025-09-01"),
    to: new Date("2025-09-01"),
    type: "Annual",
    reason: "Family Vacation",
    status: "Pending",
  },
];

export default function LeavesTable() {
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const leaveStatusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
    { value: "Canceled", label: "Canceled" },
  ];

  const openLeaveModal = (key: number) => {
    setSelectedLeave(tableData[key]);
    openModal();
  };

  const handleSave = () => {
    closeModal();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Employee
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Date
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((leave, key) => (
              <TableRow key={leave.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        width={40}
                        height={40}
                        src={leave.employeeImage}
                        alt={leave.employeeName}
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {leave.employeeName}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {new Date(leave.from).toLocaleDateString()} - {new Date(leave.to).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      leave.status === "Approved"
                        ? "success"
                        : leave.status === "Pending"
                        ? "warning"
                        : leave.status === "Canceled"
                        ? "light"
                        : "error"
                    }
                  >
                    {leave.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <button
                    onClick={() => openLeaveModal(key)}
                    className="inline-block p-2 hover:bg-gray-100 rounded-full dark:hover:bg-white/10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
  <div className="px-2 pr-14 mb-8">
    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
      Leave Request Details
    </h4>
  </div>

  <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
    {/* Employee Info */}
    <div className="flex items-center gap-4 mb-6">
      <div className="w-16 h-16 overflow-hidden rounded-full">
        <img
          src={selectedLeave?.employeeImage}
          alt={selectedLeave?.employeeName}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          {selectedLeave?.employeeName}
        </h4>
        <Badge
          size="sm"
          color={
            selectedLeave?.status === "Approved"
              ? "success"
              : selectedLeave?.status === "Pending"
              ? "warning"
              : selectedLeave?.status === "Canceled"
              ? "light"
              : "error"
          }
        >
          {selectedLeave?.status}
        </Badge>
      </div>
    </div>

    {/* Leave Details */}
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1">
        <p className="text-sm text-gray-500 dark:text-gray-400">Leave Type</p>
        <p className="font-medium dark:text-white">{selectedLeave?.type}</p>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-gray-500 dark:text-gray-400">Requested On</p>
        <p className="font-medium dark:text-white">
          {selectedLeave?.createdAt.toLocaleDateString()}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-gray-500 dark:text-gray-400">From</p>
        <p className="font-medium dark:text-white">
          {selectedLeave?.from.toLocaleDateString()}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-gray-500 dark:text-gray-400">To</p>
        <p className="font-medium dark:text-white">
          {selectedLeave?.to.toLocaleDateString()}
        </p>
      </div>
      <div className="col-span-2 space-y-1">
        <p className="text-sm text-gray-500 dark:text-gray-400">Reason</p>
        <p className="font-medium dark:text-white">{selectedLeave?.reason}</p>
      </div>
      {selectedLeave?.note && (
        <div className="col-span-2 space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">Note</p>
          <p className="font-medium dark:text-white">{selectedLeave?.note}</p>
        </div>
      )}
    </div>

    {/* Divider */}
    <div className="my-6 border-t border-gray-200 dark:border-white/[0.05]"></div>

    {/* Status Update */}
    <div className="mb-4 space-y-1">
      <Label> Update Leave Status</Label>
      <Select
            options={leaveStatusOptions}
            defaultValue={selectedLeave?.status}
            placeholder="Select Option"
            onChange={() => {}}
            className="dark:bg-dark-900"
          />
    </div>
    <div>
          <Label>Special Note</Label>
          <TextArea
            value={selectedLeave?.note}
            onChange={(value) => console.log(value)}
            rows={6}
          />
        </div>
  </div>

  {/* Footer Buttons */}
  <div className="flex items-center gap-3 px-2 mt-6 justify-end">
    <Button size="sm" variant="outline" onClick={closeModal}>
      Close
    </Button>
    <Button size="sm" onClick={handleSave}>
      Save Changes
    </Button>
  </div>
</div>

      </Modal>
    </div>
  );
}
