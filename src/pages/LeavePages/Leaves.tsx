import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import LeavesTable from "../../components/leave/LeavesTable";

export default function Leaves() {
  return (
    <>
      <PageMeta
        title="Leave Management | Virtual HR Assistant"
        description="Leave Management page of Virtual HR Assistant"
      />
      <PageBreadcrumb pageTitle="Leave Management" />
      <div className="space-y-6">
          <LeavesTable />
      </div>
    </>
  );
}
