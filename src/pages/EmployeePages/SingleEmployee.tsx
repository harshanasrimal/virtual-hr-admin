import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import EmployeeInfoCard from "../../components/employee/EmployeeInfoCard";
import PageMeta from "../../components/common/PageMeta";

export default function SingleEmployee() {
  return (
    <>
      <PageMeta
        title="Employee | Virtual HR Assistant"
        description="This is the Employee page for Virtual HR Assistant"
      />
      <PageBreadcrumb pageTitle="View Employee" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <EmployeeInfoCard />
        </div>
      </div>
    </>
  );
}
