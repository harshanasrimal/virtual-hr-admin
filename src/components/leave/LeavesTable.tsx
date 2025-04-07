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
import { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import TextArea from "../form/input/TextArea";
import Select from "../form/Select";

import { fetchAllLeaves, updateLeaveStatus } from '../../services/leaveService';
import Loader from "../common/Loader";

Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

export default function LeavesTable() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const [leaveStatus, setLeaveStatus] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const leaveStatusOptions = [
    { value: "PENDING", label: "Pending" },
    { value: "APPROVED", label: "Approved" },
    { value: "REJECTED", label: "Rejected" },
    { value: "CANCELED", label: "Canceled" },
  ];

  const openLeaveModal = (key: number) => {
    setSelectedLeave(leaves[key]);
    openModal();
  };

  const handleSave = async() => {
    try {
      await updateLeaveStatus(selectedLeave.id, leaveStatus, note);
      fetchAllLeaves()
      .then(setLeaves)
      setSelectedLeave(null);
      setLeaveStatus("");
      setNote("");
      alert(`Leave updated successfully!`);
      // optionally refresh list here
    } catch (err) {
      console.error(err);
      alert('Failed to update leave status.');
    }
    closeModal();
  };

  useEffect(() => {
    fetchAllLeaves()
      .then(setLeaves)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedLeave) {
      setLeaveStatus(selectedLeave.status);
      setNote(selectedLeave.note || "");
    }
  }, [selectedLeave]);

  if (loading) return <Loader />;

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
            {leaves.map((leave:any, key) => (
              <TableRow key={leave.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        width={40}
                        height={40}
                        src={leave.user.image}
                        alt={leave.user.profile.firstName}
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {leave.user.profile.firstName} {leave.user.profile.lastName}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {new Date(leave.fromDate).toLocaleDateString()} - {new Date(leave.toDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      leave.status === "APPROVED"
                        ? "success"
                        : leave.status === "PENDING"
                        ? "warning"
                        : leave.status === "CANCELED"
                        ? "light"
                        : "error"
                    }
                  >
                    {leave.status.toLowerCase().capitalize()}
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
          src={selectedLeave?.user.image}
          alt={selectedLeave?.user.profile.firstName}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          {selectedLeave?.user.profile.firstName} {selectedLeave?.user.profile.lastName}
        </h4>
        <Badge
          size="sm"
          color={
            selectedLeave?.status === "APPROVED"
              ? "success"
              : selectedLeave?.status === "PENDING"
              ? "warning"
              : selectedLeave?.status === "CANCELED"
              ? "light"
              : "error"
          }
        >
          {selectedLeave?.status.toLowerCase().capitalize()}
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
           {new Date(selectedLeave?.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-gray-500 dark:text-gray-400">From</p>
        <p className="font-medium dark:text-white">
        {new Date(selectedLeave?.fromDate).toLocaleDateString()}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-gray-500 dark:text-gray-400">To</p>
        <p className="font-medium dark:text-white">
        {new Date(selectedLeave?.toDate).toLocaleDateString()}
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
            onChange={(value) => setLeaveStatus(value)}
            className="dark:bg-dark-900"
          />
    </div>
    <div>
          <Label>Special Note</Label>
          <TextArea
            value={note}
            placeholder="Add a note..."
            onChange={(value) => setNote(value)}
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
