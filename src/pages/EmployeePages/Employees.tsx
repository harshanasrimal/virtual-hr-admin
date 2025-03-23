import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import EmployeesTable from "../../components/employee/EmployeesTable";

export default function Employees() {
  return (
    <>
      <PageMeta
        title="Employees | Virtual HR Assistant"
        description="Employees page of Virtual HR Assistant"
      />
      <PageBreadcrumb pageTitle="Employees" />
      <div className="space-y-6">
          <EmployeesTable />
      </div>
    </>
  );
}
