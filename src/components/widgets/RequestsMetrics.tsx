import { useEffect, useState } from "react";
import {
    DocsIcon,
    GroupIcon,
  } from "../../icons";
import { getPendingDocumentCount, getPendingLeaveCount } from "../../services/dashboardService";
  
  export default function RequestsMetrics() {
    const [pendingLeaves, setPendingLeaves] = useState(0);
    const [pendingDocs, setPendingDocs] = useState(0);

    useEffect(() => {
      getPendingLeaveCount()
        .then(setPendingLeaves)
        .catch(console.error);
  
      getPendingDocumentCount()
        .then(setPendingDocs)
        .catch(console.error);
    }, []);

    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {/* <!-- Metric Item Start --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
  
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Pending Leave Requests
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {pendingLeaves}
              </h4>
            </div>
          </div>
        </div>
        {/* <!-- Metric Item End --> */}
  
        {/* <!-- Metric Item Start --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <DocsIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Pending Document Requests
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {pendingDocs}
              </h4>
            </div>
          </div>
        </div>
        {/* <!-- Metric Item End --> */}
      </div>
    );
  }
  