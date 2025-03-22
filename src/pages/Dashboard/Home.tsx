import PageMeta from "../../components/common/PageMeta";
import RequestsMetrics from "../../components/widgets/RequestsMetrics";
import LeaveTrend from "../../components/widgets/LeaveTrend";
import DateTimeWidget from "../../components/widgets/DateTimeWidget";
import PendingLeaves from "../../components/widgets/PendingLeaves";
import PendingDocuments from "../../components/widgets/PendingDocuments";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Dashboard | Virtual HR Assistant"
        description="Dashboard page of Virtual HR Assistant"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-5">
          <RequestsMetrics />
          <DateTimeWidget />

        </div>

        <div className="col-span-12 xl:col-span-7">
          <LeaveTrend />
        </div>

        <div className="col-span-12 xl:col-span-6">
          <PendingLeaves />
        </div>
        <div className="col-span-12 xl:col-span-6">
          <PendingDocuments />
        </div>
      </div>
    </>
  );
}
