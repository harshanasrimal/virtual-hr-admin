import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
  } from "../ui/table";
  import Badge from "../ui/badge/Badge";
  
  // Define the TypeScript interface for the table rows
  interface DocRequest {
    id: number; 
    employeeName: string;
    subject: string;
    requestDate: Date;
    employeeImage: string;
    status: "Delivered" | "Pending" | "Canceled";
  }
  
  // Define the table data using the interface
  const tableData: DocRequest[] = [
    {
      id: 1,
      employeeName: "Lindsey Curtis",
      subject: "Job Confirmation Letter",
      requestDate: new Date("2025-03-01"),
      employeeImage: "/images/user/user-17.jpg",
      status: "Pending",
    },
  ];
  
  export default function PendingDocuments() {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Recent Document Requests
            </h3>
          </div>
        </div>
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Subject
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Requested Date
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHeader>
  
            {/* Table Body */}
  
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {tableData.map((document) => (
                <TableRow key={document.id} className="">
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                        <img
                          src={document.employeeImage}
                          className="h-[50px] w-[50px]"
                          alt={document.employeeName}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {document.subject}
                        </p>
                        <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                          {document.employeeName}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {document.requestDate.toDateString()}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        document.status === "Delivered"
                          ? "success"
                          : document.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {document.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
  