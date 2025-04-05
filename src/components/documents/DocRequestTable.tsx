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
import DropDocumentZone from "./DropDocumentZone";
import { getAllDocumentRequests, updateDocumentStatus } from "../../services/documentService";


export default function DocRequestTable() {
  const [documentList, setDocumentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");

  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    getAllDocumentRequests()
      .then((res) => {
        setDocumentList(res);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedRequest) {
      setStatus(selectedRequest.status);
      setUploadedFile(null);
    }
  }, [selectedRequest]);

  const openRequestModal = (key: number) => {
    setSelectedRequest(documentList[key]);
    openModal();
  };


  const handleSave = async() => {
    if (!selectedRequest) return;
    await updateDocumentStatus(
      selectedRequest.id,
      status,
      uploadedFile as File
    );
    getAllDocumentRequests()
    .then((res) => {
      setDocumentList(res);
    })
    .catch(console.error)
    .finally(() => {
      alert("Document Request Updated");
      setSelectedRequest(null);
      setUploadedFile(null);
      setStatus("");
      closeModal();
    });
  };

  if (loading) return <p>Loading...</p>;
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
                Type
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
            {documentList.map((request:any, key) => (
              <TableRow key={request.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        width={40}
                        height={40}
                        src={request.user.image}
                        alt={request.user.profile.firstName}
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {request.user.profile.firstName} {request.user.profile.lastName}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {new Date(request.requestedDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {request.type}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      request.status === "DELIVERED"
                        ? "success"
                        : request.status === "PENDING"
                        ? "warning"
                        : request.status === "CANCELLED"
                        ? "light"
                        : "error"
                    }
                  >
                    {request.status.toLowerCase().capitalize()}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <button
                    onClick={() => openRequestModal(key)}
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
          Document Request Details
        </h4>
          </div>
          <div className="flex flex-col">
  <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
    {/* Employee Info */}
    <div className="flex items-center gap-4 mb-6">
      <div className="w-16 h-16 overflow-hidden rounded-full">
        <img
          src={selectedRequest?.user.image}
          alt={selectedRequest?.user.profile.firstName}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          {selectedRequest?.user.profile.firstName} {selectedRequest?.user.profile.lastName}
        </h4>
        <Badge
          size="sm"
          color={
            selectedRequest?.status === "DELIVERED"
              ? "success"
              : selectedRequest?.status === "PENDING"
              ? "warning"
              : selectedRequest?.status === "CANCELLED"
              ? "light"
              : "error"
          }
        >
          {selectedRequest?.status}
        </Badge>
      </div>
    </div>

    {/* Request Details */}
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1">
        <p className="text-sm text-gray-500 dark:text-gray-400">Request Type</p>
        <p className="font-medium dark:text-white">{selectedRequest?.type}</p>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-gray-500 dark:text-gray-400">Date Requested</p>
        <p className="font-medium dark:text-white">
          {new Date(selectedRequest?.requestedDate).toLocaleDateString()}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-gray-500 dark:text-gray-400">Reason</p>
        <p className="font-medium dark:text-white">{selectedRequest?.reason}</p>
      </div>
    </div>

    {/* Divider */}
    <div className="my-6 border-t border-gray-200 dark:border-white/[0.05]"></div>

    {/* Status Update */}
    <div className="mb-4 space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Request Status
      </label>
      <select
        className="w-full mt-1 block rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm focus:border-primary focus:ring-primary"
        defaultValue={selectedRequest?.status}
        onChange={(e) => {
          if (selectedRequest) {
            setStatus(e.target.value);
          }
        }}
      >
        <option value="PENDING">Pending</option>
        <option value="DELIVERED">Delivered</option>
        <option value="PROCESSING">Processing</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
    </div>

    {/* File Upload */}
    <div className="mb-6 space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
        Generated Document {selectedRequest?.softCopyUrl && (
            <a 
            href={`https://hr-api.harshanasrimal.com${selectedRequest.softCopyUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline text-sm text-blue-500"
          >
            (View Current Doc)
          </a>
        )}
      </label>
      <DropDocumentZone onFileSelect={(file) => setUploadedFile(file)} />
    </div>
  </div>

  {/* Modal Footer */}
  <div className="flex items-center gap-3 px-2 mt-6 justify-end">
    <Button size="sm" variant="outline" onClick={closeModal}>
      Close
    </Button>
    <Button size="sm" onClick={handleSave}>
      Update
    </Button>
  </div>
</div>

        </div>
      </Modal></div>
  );
}
