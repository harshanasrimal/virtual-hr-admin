import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import AddEmployeeCard from "../../components/employee/AddEmployeeCard";

export default function AddEmployee() {
  return (
    <>
      <PageMeta
        title="Add Employee | Virtual HR Assistant"
        description="This is the Add Employee page for Virtual HR Assistant"
      />
      <PageBreadcrumb pageTitle="Add New Employee" />
      <AddEmployeeCard />
    </>
  );
}
