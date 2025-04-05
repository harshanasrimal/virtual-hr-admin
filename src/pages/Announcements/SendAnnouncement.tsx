import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import AddEmployeeCard from "../../components/employee/AddEmployeeCard";

export default function SendAnnouncement() {
  return (
    <>
      <PageMeta
        title="Send Announcements | Virtual HR Assistant"
        description="send announcements to employees"
      />
      <PageBreadcrumb pageTitle="Send Announcements" />
      {/* <AddEmployeeCard /> */}
    </>
  );
}
