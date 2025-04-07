import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import DocRequestTable from "../../components/documents/DocRequestTable";

export default function DocRequests() {
  return (
    <>
      <PageMeta
        title="Document Requests Management | Virtual HR Assistant"
        description="Document Requests Management page of Virtual HR Assistant"
      />
      <PageBreadcrumb pageTitle="Document Requests" />
      <div className="space-y-6">
          <DocRequestTable />
      </div>
    </>
  );
}
